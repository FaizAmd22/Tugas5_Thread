import * as Joi from "joi"

export const createFollowSchema = Joi.object({
    follower: Joi.number().required(),
    following: Joi.number().required()
})