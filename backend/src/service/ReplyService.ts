import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Reply } from "../entities/Reply";
import ResponseError from "../error/responseError";
import cloudinary from "../libs/cloudinary";
import { redisClient } from "../libs/redis";
import { createReplySchema } from "../utils/validator/replyValidator";
import LikeService from "./LikeService";

export default new (class ReplyService {
    private readonly replyRepository: Repository<Reply> = AppDataSource.getRepository(Reply)

    async getAll(req: Request, res: Response) {
        try {
            const response = await this.replyRepository.find({
                order: {
                    id: "DESC"
                },
                relations: {
                    author: true,
                    thread: true,
                    likes: true
                }
            });

            // console.log("thread :", response[0]);
            console.log("userId :", res.locals.session);
            

            const datas = [];
            let i = 0
            
            if (!res.locals.session) {
                
                return {
                    message: "Success getting all thread!",
                    data: response
                }
            } else {
                // const userId = res.locals.session.id
                const userId = req.body.userId
                for (i; i < response.length; i++) {
                    const isLiked = await LikeService.getLikeReply(response[i].id, userId)
                    
                    datas.push({
                        id: response[i].id,
                        content: response[i].content,
                        image: response[i].image,
                        isLike: isLiked,
                        likes: response[i].likes.length,
                        replies: response[i].replies.length,
                        author: response[i].author,
                        created_at: response[i].created_at,
                    });
                }
    
                return {
                    message: "Success getting all reply!",
                    data: datas
                }
            }
        } catch (error) {
            throw new ResponseError(500, "Something error while getting all reply!");
        }
    }

    async getReply(threadId: number, userId: number) {
        
        const response = await this.replyRepository
            .createQueryBuilder("reply")
            .leftJoinAndSelect("reply.author", "author")
            .leftJoinAndSelect("reply.likes", "likes")
            .leftJoinAndSelect("reply.replies", "replies")
            .where("reply.thread = :thread", { thread: threadId })
            .orderBy("reply.created_at", "DESC")
            .getMany();
        // const likes = response.map(async (val) => await LikeService.getLikeReply(val.id, userId));

        const replies = [];
        let i = 0;
        const len = response.length;
        for (i; i < len; i++) {
            const isLike = await LikeService.getLikeReply(response[i].id, userId)

            replies.push({
                id: response[i].id,
                content: response[i].content,
                image: response[i].image,
                likes: response[i].likes.length,
                isLike: isLike,
                replies: response[i].replies.length,
                author: response[i].author,
                created_at: response[i].created_at,
            });
        }
        // await redisClient.del("threadsWithAuth")
        // await redisClient.del("threads");
        
        return {
            message: "Success getting all reply!",
            data: replies
        }
    }

    async create(req: Request, res: Response) {
        let data: any

        const loginSession = res.locals.session
        // console.log(loginSession);
        
        const idParams = parseInt(req.params.id, 10)
        // console.log("idParams :", idParams);

        if (!req.file) {
            data = {
                content: req.body.content,
                thread: idParams,
                author: loginSession.id,
            };
        } else {
            data = {
                content: req.body.content,
                thread: idParams,
                image: req.file.filename,
                author: loginSession.id,
            };
        }
        // console.log("data :", data);
        
        const {error, value} = createReplySchema.validate(data)
        if(error) throw new ResponseError(403, error.message)
        let valid = {};
        
        // console.log("value :", value);
        if (!data.image && !data.content) {
            return {message: "data can't be empty!"}
        } else if (!data.image && data.content) {
            valid = {
                content: value.content,
                thread: value.thread,
                author: value.author,
            };
        } else if (data.image && !data.content) {
            cloudinary.upload();
            const uploadImage = await cloudinary.destination(value.image);
            
            valid = {
                image: uploadImage.secure_url,
                thread: value.thread,
                author: value.author,
            };
        } else if (data.image && data.content) {
            cloudinary.upload();
            const uploadImage = await cloudinary.destination(value.image);
    
            valid = {
                content: value.content,
                image: uploadImage.secure_url,
                thread: value.thread,
                author: value.author,
            };
        }
        
        // console.log("valid :", valid);
        await this.replyRepository.save(valid);
        await redisClient.del("threadsWithAuth")
        await redisClient.del("threads");


        return {
            message: "Reply created!",
            data: valid,
        };
    }

    async delete(id: any, session: number) {
        const oldData = await this.replyRepository.findOne({ where: id, relations: { author: true } });
        if (!oldData) throw new ResponseError(404, "Reply Not Found");

        if (session !== oldData.author.id) throw new ResponseError(403, "Cannot delete another user's Reply");

        await this.replyRepository.delete(id);
        await redisClient.del("threadsWithAuth")
        await redisClient.del("threads");

        return {
            message: "Reply deleted",
        };
    }
})