import { Request, Response } from "express"
import { Equal, Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { Follow } from "../entities/Follow"
import { User } from "../entities/User"
import ResponseError from "../error/responseError"

export default new (class FollowService {
    private readonly followRepository: Repository<Follow> = AppDataSource.getRepository(Follow)

    async get(req: Request, res: Response) {
        const id = res.locals.session.id
        const follower = await AppDataSource.getRepository(User).find({
            where: {
                following: {follower: Equal(id)}
            },
            relations: {
                following: true,
                follower: true
            }
        })

        const following = await AppDataSource.getRepository(User).find({
            where: { follower: { following: Equal(id) } },
            relations: { following: true }
        })


        return {
            message: "Success get data folow!",
            follower: follower,
            following: following
        }
    }

    async follow(req: Request, res: Response) {
        const following = req.body.following
        const follower = res.locals.session.id

        const checkFollower = await AppDataSource.getRepository(User).find({
            where: {
                id: following
            }
        })
        console.log("checkFollower :", checkFollower);
        
        if (!checkFollower[0]) throw new ResponseError(403, "User not found!")
        
        console.log("Following :", following);
        console.log("Follower :", follower);
        if (follower == following) throw new ResponseError(403, "Can't follow yourself!")

        await this.followRepository.save({ follower, following })
        return {
            message: "Follow Success!"
        }
    }

    async unFollow(req: Request, res: Response) {
        const following = req.body.following
        const follower = res.locals.session.id
        if(!following) return {messaege: "User not found!"}

        console.log("Following :", following);
        console.log("Follower :", follower);

        const checkFollower = await AppDataSource.getRepository(User).find({
            where: {
                id: following
            }
        })
        console.log("checkFollower :", checkFollower);
        
        if (!checkFollower[0]) throw new ResponseError(403, "User not found!")

        await this.followRepository.delete({follower, following})
        return {
            message: "Unfollow Success!"
        }
    }
})