import { Request, Response } from "express"
import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { Thread } from "../entities/Thread"
import ResponseError from "../error/responseError"
import cloudinary from "../libs/cloudinary"
import { createThreadSchema, updateThreadSchema } from "../utils/validator/threadValidator"
import LikeService from "./LikeService"

export default new (class ThreadService {
    private readonly threadRepository: Repository<Thread> = AppDataSource.getRepository(Thread)

    async getAll(req: Request, res: Response) {
        try {
            const response = await this.threadRepository.find({
                order: {
                    id: "DESC"
                },
                relations: {
                    author: true,
                    likes: true,
                    replies: true,
                }
            });

            const userId = res.locals.session.id
            console.log("userId :", userId);

            const datas = [];
            let i = 0
            for (i; i < response.length; i++) {
                const isLiked = await LikeService.getLikeThread(response[i].id, userId)
                
                datas.push({
                    id: response[i].id,
                    content: response[i].content,
                    image: response[i].image,
                    isLike: isLiked,
                    likes: response[i].likes.length,
                    replies: response[i].replies.length,
                    author: response[i].author,
                    created_at: response[i].created_at,
                    updated_at: response[i].updated_at,
                });
            }

            return {
                message: "Success getting all thread!",
                data: datas
            }
        } catch (error) {
            throw new ResponseError(500, "Something error while getting all thread!");
        }
    }

    async getThread(req: Request, res: Response) {
        try {
            const id: number = parseInt(req.params.id, 10)
            console.log("id :", id);
            
            const response = await this.threadRepository.findOne({
                where: { id: id },
                relations: {
                    author: true,
                    likes: true,
                    replies: true
                }
            })

            return {
                message: "Success getting thread!",
                data: response
            }
        } catch (error) {
            throw new ResponseError(500, "Something error while getting thread!");
        }
    }

    async createThread(req: Request, res: Response) {
        let data: any

        if (!req.file) {
            data = {
                content: req.body.content,
                author: req.body.author,
            };
        } else {
            data = {
                content: req.body.content,
                image: req.file.filename,
                author: req.body.author,
            };
        }
        console.log("data :", data);

        const {error, value} = createThreadSchema.validate(data)
        if(error) return res.status(400).json({ message: error.message})
        let valid = {};
        
        if (!data.image && !data.content) {
            return {message: "data can't be empty!"}
        } else if (!data.image && data.content) {
            valid = {
                content: value.content,
                author: value.author,
            };
        } else if (data.image && !data.content) {
            cloudinary.upload();
            const uploadImage = await cloudinary.destination(value.image);
            
            valid = {
                image: uploadImage.secure_url,
                author: value.author,
            };
        } else if (data.image && data.content) {
            cloudinary.upload();
            const uploadImage = await cloudinary.destination(value.image);
    
            valid = {
                content: value.content,
                image: uploadImage.secure_url,
                author: value.author,
            };
        }
        
        console.log("valid :", valid);
        await this.threadRepository.save(valid);

        return {
            message: "Thread created!",
            data: valid,
        };
    }

    async update(req: Request, res: Response) {
        let data: any
        
        const id = parseInt(req.params.id, 10)
        const session = res.locals.session.id

        console.log("session :", session);

        const oldData = await this.threadRepository.findOne({
            where: { id: id },
            relations: {
                author: true,
            },
            select: {
                author: {
                    id: true,
                }
            }
        })
        
        // console.log("oldData :", oldData);
        console.log("author id :", oldData.author.id);
        
        if(oldData.author.id !== session) throw new ResponseError(403, "You don't have permission to update other people thread!");

        if (!req.file) {
            data = {
                content: req.body.content,
            };
        } else {
            data = {
                content: req.body.content,
                image: req.file.filename,
            };
        }
        // console.log("data :", data);
        
        const { error, value } = updateThreadSchema.validate(data)
        if (error) throw new ResponseError(403, error.message);

        let valid = {};
        
        if (!data.image && !data.content) {
            return {message: "data can't be empty!"}
        } else if (!data.image && data.content) {
            valid = {
                content: value.content,
            };
        } else if (data.image && !data.content) {
            cloudinary.upload();
            const uploadImage = await cloudinary.destination(value.image);
            
            valid = {
                image: uploadImage.secure_url,
            };
        } else if (data.image && data.content) {
            cloudinary.upload();
            const uploadImage = await cloudinary.destination(value.image);
    
            valid = {
                content: value.content,
                image: uploadImage.secure_url,
            };
        }
        
        console.log("valid :", valid);
        await this.threadRepository.update(id, valid);

        return {
            message: "Thread updated!",
            data: valid,
        };
    }
    
    async delete(id: any, session: number) {
        const oldData = await this.threadRepository.findOne({ where: id, relations: { author: true } });
        if (!oldData) throw new ResponseError(404, "Not Found");

        if (session !== oldData.author.id) throw new ResponseError(403, "Cannot delete another user's Thread");

        await this.threadRepository.delete(id);
        return {
            message: "Thread deleted",
        };
    }
})