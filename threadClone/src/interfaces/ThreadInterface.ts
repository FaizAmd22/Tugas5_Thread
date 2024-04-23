import { IUsers } from "./UsersInterface"

export interface ThreadInterface {
    thread : IThreads
}

export interface IThreads {
    id: string
    image: string
    content : string
    posted_at : number
    likes: number
    isLike: boolean
    replies: number
    created_at : string
    author: IUsers
}