import { Request, Response } from "express";
import ThreadService from "../service/ThreadService";

export default new (class ThreadController {
    async getAllThread(req: Request, res: Response) {
        try {
            const response = await ThreadService.getAll(req, res)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(error.status).json(error.message);
        }
    }

    async getAllThreadWithAuth(req: Request, res: Response) {
        try {
            const response = await ThreadService.getAllWithAuth(req, res)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(error.status).json(error.message);
        }
    }

    async getThread(req: Request, res: Response) {
        try {
            const response = await ThreadService.getThread(req, res)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(error.status).json(error.message);
        }
    }

    async getThreadWithAuth(req: Request, res: Response) {
        try {
            const response = await ThreadService.getThreadWithAuth(req, res)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(error.status).json(error.message);
        }
    }

    async createThread(req: Request, res: Response) {
        try {
            const response = await ThreadService.createThread(req, res);

            return res.status(201).json(response);
        } catch (error) {
            return res.status(error.status).json(error.message);
        }
    }

    async updateThread(req: Request, res: Response) {
        try {
            const response = await ThreadService.update(req, res)

            return res.status(201).json(response);
        } catch (error) {
            return res.status(error.status).json(error.message);
        }
    }

    async deleteThread(req: Request, res: Response) {
        try {
            const response = await ThreadService.delete(req.params, res.locals.session.id);

            return res.status(200).json(response);
        } catch (error) {
            return res.status(error.status).json({ message: error.message });
        }
    }
})