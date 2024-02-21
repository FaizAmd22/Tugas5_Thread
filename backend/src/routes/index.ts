import { Router } from "express";
import authController from "../controllers/authController";
import * as multer from "multer";
import UserControllers from "../controllers/UserController";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import ThreadController from "../controllers/ThreadController";
import uploadFile from "../middlewares/uploadFile";
import ReplyController from "../controllers/ReplyController";
import LikeController from "../controllers/LikeController";
import FollowController from "../controllers/FollowController";

const routes = Router();
const uploadMiddleware = new uploadFile("image");

// Auth API
routes.post("/register", authController.register)
routes.post("/login", authController.login)

// User API
routes.get("/users", UserControllers.getAllUser)
routes.get("/user/:username", UserControllers.getUser)
routes.get("/user/current/:username", AuthMiddleware.Auth, UserControllers.getCurrentUser)
routes.patch("/user/update/:id", AuthMiddleware.Auth, UserControllers.updateUser)
routes.delete("/user/delete/:id", AuthMiddleware.Auth, UserControllers.deleteUser)

// Thread API
routes.post("/thread", AuthMiddleware.Auth, uploadMiddleware.handleUpload.bind(uploadMiddleware), ThreadController.createThread)
routes.get("/thread", AuthMiddleware.Auth,ThreadController.getAllThread)
routes.get("/thread/:id", AuthMiddleware.Auth, ThreadController.getThread)
routes.patch("/thread/:id", AuthMiddleware.Auth, uploadMiddleware.handleUpload.bind(uploadMiddleware), ThreadController.updateThread)
routes.delete("/thread/:id", AuthMiddleware.Auth, ThreadController.deleteThread)

// Reply
routes.post("/thread/:id/reply", AuthMiddleware.Auth, uploadMiddleware.handleUpload.bind(uploadMiddleware), ReplyController.createReply)
routes.get("/reply", AuthMiddleware.Auth, ReplyController.getAllReply)
routes.delete("/reply/:id", AuthMiddleware.Auth, ReplyController.deleteReply)

// Like API
routes.get("/like", AuthMiddleware.Auth, LikeController.getAllLike)
routes.get("/thread/:threadId/like", AuthMiddleware.Auth, LikeController.getLike)
routes.post("/thread/:threadId/like", AuthMiddleware.Auth, LikeController.createLikeThread)
routes.post("/reply/:replyId/like", AuthMiddleware.Auth, LikeController.createLikeReply)

// Follow API
routes.get("/follow", AuthMiddleware.Auth, FollowController.getFollow)
routes.post("/follow", AuthMiddleware.Auth, FollowController.follow)
routes.delete("/unfollow", AuthMiddleware.Auth, FollowController.unFollow)

export default routes;
