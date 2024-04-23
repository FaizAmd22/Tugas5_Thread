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
const uploadPictureMiddleware = new uploadFile("picture");
const uploadCoverMiddleware = new uploadFile("cover_photo");

// Auth API
routes.post("/register", authController.register)
routes.post("/login", authController.login)
routes.delete("/logout", authController.logout)

// User API
routes.get("/users", UserControllers.getAllUser)
routes.get("/search", AuthMiddleware.Auth, UserControllers.getSearchUsers)
routes.get("/user/:username", UserControllers.getUser)
routes.get("/users/:username", AuthMiddleware.Auth, UserControllers.getUserAuth)
routes.get("/user/current/:id", AuthMiddleware.Auth, UserControllers.getCurrentUser)
routes.patch("/user/update/:id", AuthMiddleware.Auth, UserControllers.updateUser)
routes.patch("/user/picture/:id", AuthMiddleware.Auth, uploadPictureMiddleware.handleUpload.bind(uploadPictureMiddleware), UserControllers.updatePicture)
routes.patch("/user/cover/:id", AuthMiddleware.Auth, uploadCoverMiddleware.handleUpload.bind(uploadCoverMiddleware), UserControllers.updateCover)
routes.delete("/user/delete/:id", AuthMiddleware.Auth, UserControllers.deleteUser)

// Thread API
routes.get("/thread", ThreadController.getAllThread)
routes.get("/threads", AuthMiddleware.Auth, ThreadController.getAllThreadWithAuth)
routes.post("/thread", AuthMiddleware.Auth, uploadMiddleware.handleUpload.bind(uploadMiddleware), ThreadController.createThread)
routes.get("/thread/:id", ThreadController.getThread)
routes.get("/threads/:id", AuthMiddleware.Auth, ThreadController.getThreadWithAuth)
routes.patch("/thread/:id", AuthMiddleware.Auth, uploadMiddleware.handleUpload.bind(uploadMiddleware), ThreadController.updateThread)
routes.delete("/thread/:id", AuthMiddleware.Auth, ThreadController.deleteThread)

// Reply
routes.get("/reply", ReplyController.getAllReply)
routes.get("/reply/:id", AuthMiddleware.Auth,ReplyController.getReplyWithAuth)
routes.post("/thread/:id/reply", AuthMiddleware.Auth, uploadMiddleware.handleUpload.bind(uploadMiddleware), ReplyController.createReply)
routes.delete("/reply/:id", AuthMiddleware.Auth, ReplyController.deleteReply)

// Like API
routes.get("/like", AuthMiddleware.Auth, LikeController.getAllLike)
routes.get("/thread/:threadId/like", AuthMiddleware.Auth, LikeController.getLike)
routes.post("/thread/:threadId/like", AuthMiddleware.Auth, LikeController.createLikeThread)
routes.post("/reply/:replyId/like", AuthMiddleware.Auth, LikeController.createLikeReply)

// Follow API
routes.get("/follow/:id", FollowController.getFollow)
routes.post("/follow", AuthMiddleware.Auth, FollowController.follow)
routes.post("/unfollow", AuthMiddleware.Auth, FollowController.unFollow)

export default routes;
