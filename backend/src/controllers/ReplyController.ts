import { Request, Response } from "express";
import ReplyService from "../service/ReplyService";

export default new (class ReplyController {
    async getAllReply(req: Request, res: Response) {
        try {
            const response = await ReplyService.getAll(req, res)

            return res.status(201).json(response);
        } catch (error) {
            return res.status(error.status).json(error.message);
        }
    }

    async getReplyWithAuth(req: Request, res: Response) {
        try {
            const threadId = parseInt(req.params.id, 10)
        const userId = res.locals.session.id
            const response = await ReplyService.getReply(threadId, userId)

            return res.status(201).json(response);
        } catch (error) {
            return res.status(error.status).json(error.message);
        }
    }

    async createReply(req: Request, res: Response) {
        try {
            const response = await ReplyService.create(req, res);

            return res.status(201).json(response);
        } catch (error) {
            return res.status(error.status).json(error.message);
        }
    }

    async deleteReply(req: Request, res: Response) {
        try {
            const response = await ReplyService.delete(req.params, res.locals.session.id);

            return res.status(200).json(response);
        } catch (error) {
            return res.status(error.status).json({ message: error.message });
        }
    }
})