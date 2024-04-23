import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import * as bcrypt from "bcrypt";
import ResponseError from "../error/responseError";
import cloudinary from "../libs/cloudinary";
import FollowService from "./FollowService";
import { redisClient } from "../libs/redis";

export default new (class UserService {
    private readonly UserRepostory: Repository<User> = AppDataSource.getRepository(User);

    async getAllUsers() {
        try {
            let dataUsers = await redisClient.get("users")

            if (!dataUsers) {
                const response = await this.UserRepostory.find({
                    order: {
                        id: "DESC"
                    },
                    relations: {
                        follower: true,
                        following: true
                    }
                })

                if (!response) return { message: "Data not found!" }
                
                const datas = [];
                let i = 0
                
                for (i; i < response.length; i++) {
                    datas.push({
                        id: response[i].id,
                        name: response[i].name,
                        username: response[i].username,
                        picture: response[i].picture,
                        follower: response[i].following.length,
                        following: response[i].follower.length,
                        bio: response[i].bio,
                        created_at: response[i].created_at,
                        cover_photo: response[i].cover_photo,
                    });
                }
                dataUsers = JSON.stringify(datas)
                await redisClient.set("users", JSON.stringify(datas))
            }

            return {
                message: "Success getting all users!",
                data: JSON.parse(dataUsers)
            }
        } catch (error) {
            return {
                message: "Something error while getting all users"
            }
        }
    }

    async getUser(username: string) {
        try {
            let dataUser = await redisClient.get("user");
    
            const response = await this.UserRepostory.findOne({
                where: { username },
                relations: {
                    threads: true,
                    likes: true,
                    following: true,
                    follower: true,
                    replies: true
                }
            });
    
            if (!response) return { message: "User not found!" };
    
            let user = JSON.parse(dataUser);
    
            if (!user || JSON.stringify(user) !== JSON.stringify(response)) {
                await redisClient.del("user");

                // const isFollow = await FollowService.getFollow(response.id, userId)
                user = {
                    id: response.id,
                    name: response.name,
                    username: response.username,
                    bio: response.bio,
                    picture: response.picture,
                    cover_photo: response.cover_photo,
                    created_at: response.created_at,
                    // isFollow: isFollow,
                    following: response.follower.length,
                    follower: response.following.length,
                    // thread: response.threads
                };
                await redisClient.set("user", JSON.stringify(user));
            }
    
            return {
                message: "Success getting user!",
                data: user
            };
        } catch (error) {
            return { message: "Something error while getting user!" };
        }
    }

    async getUserAuth(username: string, userId: number) {
        try {
            let dataUser = await redisClient.get("user");
    
            const response = await this.UserRepostory.findOne({
                where: { username },
                relations: {
                    // threads: true,
                    likes: true,
                    following: true,
                    follower: true,
                    replies: true
                }
            });
    
            if (!response) return { message: "User not found!" };
    
            let user = JSON.parse(dataUser);
    
            if (!user || JSON.stringify(user) !== JSON.stringify(response)) {
                await redisClient.del("user");

                const isFollow = await FollowService.getFollow(response.id, userId)
                user = {
                    id: response.id,
                    name: response.name,
                    username: response.username,
                    bio: response.bio,
                    picture: response.picture,
                    cover_photo: response.cover_photo,
                    created_at: response.created_at,
                    isFollow: isFollow,
                    following: response.follower.length,
                    follower: response.following.length,
                    // thread: response.threads
                };
                await redisClient.set("user", JSON.stringify(user));
            }
    
            return {
                message: "Success getting user!",
                data: user
            };
        } catch (error) {
            return { message: "Something error while getting user!" };
        }
    }

    async getCurrent(id: number) {
        try {
            
            const response = await this.UserRepostory.findOne({
                where: { id },
                relations: {
                    follower: true,
                    following: true
                }
            })

            if(!response) return {message: "User not found!"}

            const user = {
                id: response.id,
                name: response.name,
                username: response.username,
                bio: response.bio,
                picture: response.picture,
                cover_photo: response.cover_photo,
                created_at: response.created_at,
                following: response.follower.length,
                follower: response.following.length,
                thread: response.threads
            }

            return {
                message: "Success getting user!",
                data: user
            }
        } catch (error) {
            return { message: "Something error while getting current user!" }
        }
    }

    async search(id: number) {
        const response = await this.UserRepostory.find({
            relations: {
                follower: true,
                following: true
            }
        });
        return await Promise.all(
            response.map(async (val) => {
                const follow = await FollowService.getFollow(val.id, id);

                return {
                    ...val,
                    isFollow: follow,
                };
            })
        );
    }

    async update(id: any, session: number, data: any) {
        try {
            if (session !== id) return {message: "You don't have permisson!"}
            let user = {};

            if (!data.password) {
                user = {
                    name: data.name,
                    username: data.username,
                    bio: data.bio,
                };
            } else {
                const hash = await bcrypt.hash(data.password, 10);
                user = {
                    name: data.name,
                    username: data.username,
                    password: hash,
                    bio: data.bio,
                };
            }

            await this.UserRepostory.update(id, user);
            await redisClient.del("users");
            await redisClient.del("threadsWithAuth")

            return {
                message: "Account updated",
                user: user,
            };
        } catch (error) {
            return {message: "Something error while updated!"}
        }
    }

    async updatePicture(id: number, session: number, picture: any) {
        try {
            if (session !== id) throw new ResponseError(403, "You don't have permission to change other user picture!")

            if (!picture) throw new ResponseError(403, "Picture ca't be empty!")

            const currentUser = await this.UserRepostory.findOne({
                where: { id }
            })

            if (currentUser.picture == picture) return { message: "You don't change the picture" } 
            else {
                cloudinary.upload()
                const uploadPicture = await cloudinary.destination(picture);

                await this.UserRepostory.update(id, { picture: uploadPicture.secure_url })
                await redisClient.del("users");
                await redisClient.del("threadsWithAuth")

                // console.log("picture :", picture);
                return { message: "Picture Updated!" }
            }
        } catch (error) {
            return {message: "Something error while updated!"}
        }
    }

    async updateCover(id: number, session: number, cover: any) {
        try {
            if (session !== id) throw new ResponseError(403, "You don't have permission to change other user Cover!")

            if (!cover) throw new ResponseError(403, "Cover ca't be empty!")

            const currentUser = await this.UserRepostory.findOne({
                where: { id }
            })
            
            if (currentUser.cover_photo == cover) return { message: "You don't change the cover" }
            else {
                cloudinary.upload()
                const uploadCover = await cloudinary.destination(cover);

                await this.UserRepostory.update(id, { cover_photo: uploadCover.secure_url })
                await redisClient.del("users");
                await redisClient.del("threadsWithAuth")
                
                // console.log("cover :", cover);
                return { message: "Cover Updated!" }
            }
        } catch (error) {
            return {message: "Something error while updated!"}
        }
    }

    async delete(id: number, session: number, password) {
        try {
            if (session !== id) return { message: "You don't have permission to delete!" }
            
            const user = await this.UserRepostory.findOne({
                where: { id },
                select: { password }
            })

            const compared = await bcrypt.compare(password, user.password)
            if (!compared) return { message: "Password wrong!" }
            
            await this.UserRepostory.delete({ id })
            await redisClient.del("users");
            await redisClient.del("threadsWithAuth")

            return {
                message: "Success to deleted!"
            }
        } catch (error) {
            return {
                message: "Something error while deleted!"
            }
        }
    }
})();
