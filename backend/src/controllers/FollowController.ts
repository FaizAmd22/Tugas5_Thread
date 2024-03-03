import { Request, Response } from "express";
import FollowService from "../service/FollowService";

export default new (class LikeController {
    async getFollow(req: Request, res: Response) {
        try {
            const response = await FollowService.get(req.params.id)

            return res.status(201).json(response);
        } catch (error) {
            return res.status(error.status).json(error.message);
        }
    }

    async follow(req: Request, res: Response) {
        try {
            const response = await FollowService.follow(req, res)

            return res.status(201).json(response);
        } catch (error) {
            return res.status(error.status).json(error.message);
        }
    }
    
    async unFollow(req: Request, res: Response) {
        try {
            const response = await FollowService.unFollow(req, res)

            return res.status(201).json(response);
        } catch (error) {
            return res.status(error.status).json(error.message);
        }
    }
})