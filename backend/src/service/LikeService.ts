import { Request, Response } from "express"
import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { Like } from "../entities/Like"
import ResponseError from "../error/responseError"
import { redisClient } from "../libs/redis"
import { createLikeReplySchema, createLikeThreadSchema } from "../utils/validator/likeValidator"

export default new (class LikeService {
    private readonly likeRepository: Repository<Like> = AppDataSource.getRepository(Like)

    async getLike(req: Request, res: Response) {
        try {
            const response = await this.likeRepository.find({
                relations: {
                    author: true,
                    thread: true
                }
            })

            console.log("Like :", response)
            return {
                message: "Success get all like!",
                data: response
            }
        } catch (error) {
            throw new ResponseError(400, "Error while get all like!")
        }
    }

    async getLikeThread(threadId: number, authorId: number) {
        const response = await this.likeRepository
            .createQueryBuilder("like")
            .where("like.thread = :thread", { thread: threadId })
            .andWhere("like.author = :author", { author: authorId })
            .getOne();

        if (response) {
            await redisClient.del("threadsWithAuth")
            return true
        }

        await redisClient.del("threadsWithAuth")
        return false
    }

    async likeThread(req: Request, res: Response) {
        const threadId = parseInt(req.params.threadId, 10)
        // console.log("thread Id :", threadId);
        const data = {
            thread: threadId
        }

        const { error, value } = createLikeThreadSchema.validate(data)
        if (error) throw new ResponseError(400, error.message)

        const loginSession = res.locals.session
        // console.log(loginSession);
        // console.log(value);

        const likeSelected = await this.likeRepository.findOne({
            where: {
                author: {
                    id: loginSession.id
                },
                thread: {
                    id: value.thread
                }
            }
        })

        // console.log("likeSelected :", likeSelected);

        if (likeSelected) {
            await this.likeRepository.remove(likeSelected)
            await redisClient.del("threadsWithAuth")
            await redisClient.del("threads");
            await redisClient.del("following");
            await redisClient.del("follower");
            await redisClient.del("users");

            return {message: "Succes remove like!"}
        }

        const like = this.likeRepository.create({
            thread: value.thread,
            author: {
                id: loginSession.id
            }
        })

        const response = await this.likeRepository.save(like)
        await redisClient.del("threadsWithAuth")
        await redisClient.del("threads");
        await redisClient.del("following");
        await redisClient.del("follower");
        await redisClient.del("users");

        return {
            message: "Success like!",
            data: response
        }
    }

    async getLikeReply(replyId, authorId) {
        const chk = await this.likeRepository
            .createQueryBuilder("like")
            .where("like.reply = :reply", { reply: replyId })
            .andWhere("like.author = :author", { author: authorId })
            .getOne();

        if (chk) {
            await redisClient.del("threadsWithAuth")
            return true;
        }
        
        await redisClient.del("threadsWithAuth")
        return false;
    }

    async likeReply(req: Request, res: Response) {
        const replyId = parseInt(req.params.replyId, 10)
        const data = {
            reply: replyId
        }

        const { error, value } = createLikeReplySchema.validate(data)
        if (error) throw new ResponseError(400, error.message)

        const loginSession = res.locals.session
        console.log(loginSession);
        console.log(value);

        const likeSelected = await this.likeRepository.findOne({
            where: {
                author: {
                    id: loginSession.id
                },
                reply: {
                    id: value.reply
                }
            }
        })

        console.log("likeSelected :", likeSelected);

        if (likeSelected) {
            await this.likeRepository.remove(likeSelected)
            await redisClient.del("threadsWithAuth")
            await redisClient.del("threads");
            await redisClient.del("following");
            await redisClient.del("follower");
            await redisClient.del("users");

            return {message: "Succes remove like!"}
        }

        const like = this.likeRepository.create({
            reply: value.reply,
            author: {
                id: loginSession.id
            }
        })

        const response = await this.likeRepository.save(like)
        await redisClient.del("threadsWithAuth")
        await redisClient.del("threads");
        await redisClient.del("following");
        await redisClient.del("follower");
        await redisClient.del("users");

        return {
            message: "Success like!",
            data: response
        }
    }
})()