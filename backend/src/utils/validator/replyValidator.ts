import * as Joi from "joi"

export const createReplySchema = Joi.object({
    content: Joi.string().max(255).allow(null),
    image: Joi.string().allow(null),
    thread: Joi.number().required(),
    author: Joi.number().required()
})

export const updateReplySchema = Joi.object({
    content: Joi.string().allow().optional(),
    image: Joi.string().allow().optional(),
    updated_at: Joi.date().default(new Date())
})