import * as Joi from "joi"

export const createLikeThreadSchema = Joi.object({
    user: Joi.number(),
    thread: Joi.number()
})

export const createLikeReplySchema = Joi.object({
    user: Joi.number(),
    reply: Joi.number()
})