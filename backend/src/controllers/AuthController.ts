import { Request, Response } from "express";
import ResponseError from "../error/responseError";
import { redisClient } from "../libs/redis";
import AuthService from "../service/AuthService";

export default new (class AuthController {
    async register(req: Request, res: Response) {
        try {
            const response = await AuthService.register(req, res);

            return res.status(201).json(response);
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

    async login(req: Request, res: Response) {
        try {

            const response = await AuthService.login(req, res);
            console.log(response)

            return res
                .status(200)
                .json(response);
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

    async logout(req: Request, res: Response) {
        try {
            await redisClient.del("users");
            await redisClient.del("threads");
            await redisClient.del("follower");
            await redisClient.del("following");
            await redisClient.del("threadsWithAuth")
            return res.status(200).json({message: "Logout Success!"})
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }
})();
