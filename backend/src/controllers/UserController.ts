import { Request, Response } from "express";
import userService from "../service/userService";

export default new (class UserController {
    async getAllUser(req: Request, res: Response) {
        try {
            const response = await userService.getAllUsers()

            res.status(200).json({
                message: response.message,
                data: response.data
            })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    async getUser(req: Request, res: Response) {
        try {
            const username = req.params.username
            // const userId = res.locals.session.id
            // console.log("userId :", userId);
            
            const response = await userService.getUser(username)

            res.status(200).json({
                message: response.message,
                data: response.data
            })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    async getUserAuth(req: Request, res: Response) {
        try {
            const username = req.params.username
            const userId = res.locals.session.id
            console.log("userId :", userId);
            
            const response = await userService.getUserAuth(username, userId)

            res.status(200).json({
                message: response.message,
                data: response.data
            })
            // return res.json({message: "getUserAuth success!"})
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    async getCurrentUser(req: Request, res: Response) {
        try {
            const response = await userService.getCurrent(res.locals.session.id);

            res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getSearchUsers(req: Request, res: Response) {
        try {
            const userId = res.locals.session.id
            console.log("userId :", userId);
            
            const response = await userService.search(res.locals.session.id);
            
            res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const response = await userService.update(
                parseInt(req.params.id),
                res.locals.session.id,
                req.body)

            res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    async updatePicture(req: Request, res: Response) {
        try {
            console.log(req.params.id);
            const response = await userService.updatePicture(
                parseInt(req.params.id),
                res.locals.session.id,
                req.file.filename)
            // console.log("files :", req.file.filename);
            
            res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    async updateCover(req: Request, res: Response) {
        try {
            console.log(req.params.id);
            const response = await userService.updateCover(
                parseInt(req.params.id),
                res.locals.session.id,
                req.file.filename)
            // console.log("files :", req.file.filename);
            
            res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const response = await userService.delete(
                parseInt(req.params.id),
                res.locals.session.id,
                req.body.password
            )

            res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
})