import { IUsers } from "./UsersInterface"

export interface LikesInterface {
    id: string
    isLiked: boolean
    likedPerson: ILikedPerson
    liked: number
    type: string
}

export interface ILikedPerson {
    id: number
    author: IUsers
}