import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import * as bcrypt from "bcrypt";
import ResponseError from "../error/responseError";
import cloudinary from "../libs/cloudinary";

export default new (class UserService {
    private readonly UserRepostory: Repository<User> = AppDataSource.getRepository(User);

    async getAllUsers() {
        try {
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

            return {
                message: "Success getting all users!",
                data: datas
            }
        } catch (error) {
            return {
                message: "Something error while getting all users"
            }
        }
    }

    async getUser(username: string) {
        try {
            const response = await this.UserRepostory.findOne({
                where: { username },
                relations: {
                    threads: true,
                    likes: true,
                    following: true,
                    follower: true,
                    replies: true
                }
            })

            if (!response) return { message: "User not found!" }
            
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
            return {message: "Something error while getting user!"}
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

    
    async update(id: number, session: number, data: any) {
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
    
                await this.UserRepostory.update(id, {picture: uploadPicture.secure_url})
    
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
    
                await this.UserRepostory.update(id, {cover_photo: uploadCover.secure_url})
    
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
