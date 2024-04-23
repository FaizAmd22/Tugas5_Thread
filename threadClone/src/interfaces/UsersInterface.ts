export interface UsersInterface {
    data: IUsers
    type: string
}

export interface IUsers {
    id: number | null
    bio: string
    name: string
    username: string
    picture: string
    cover_photo: string
    isFollow: boolean
}