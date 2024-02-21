import { Request, Response } from "express";
import LikeService from "../service/LikeService";

export default new (class LikeController {
    async getAllLike(req: Request, res: Response) {
        try {
            const response = await LikeService.getLike(req, res)

            return res.status(201).json(response);
        } catch (error) {
            return res.status(error.status).json(error.message);
        }
    }
    async getLike(req: Request, res: Response) {
        try {
            const threadId = parseInt(req.params.threadId, 10)
            const loginSession = res.locals.session.id
            console.log("userId :", loginSession);
            console.log("threadId :", threadId);
            
            const response = await LikeService.getLikeThread(threadId, loginSession)

            return res.status(201).json(response);
        } catch (error) {
            return res.status(error.status).json(error.message);
        }
    }

    async createLikeThread(req: Request, res: Response) {
        try {
            const response = await LikeService.likeThread(req, res)

            return res.status(201).json(response);
        } catch (error) {
            return res.status(error.status).json(error.message);
        }
    }

    async createLikeReply(req: Request, res: Response) {
        try {
            const response = await LikeService.likeReply(req, res)

            return res.status(201).json(response);
        } catch (error) {
            return res.status(error.status).json(error.message);
        }
    }
})