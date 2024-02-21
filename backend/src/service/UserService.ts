import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import * as bcrypt from "bcrypt";
import ResponseError from "../error/responseError";

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

            if(!response) return {message: "Data not found!"}

            return {
                message: "Success getting all users!",
                data: response
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

            if(!response) return {message: "User not found!"}

            return {
                message: "Success getting user!",
                data: response
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

            return {
                message: "Success getting current user!",
                data: response
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

            const response = await this.UserRepostory.update(id, user);

            return {
                message: "Account updated",
                user: response,
            };
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
