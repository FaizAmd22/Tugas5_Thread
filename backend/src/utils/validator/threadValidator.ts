import * as Joi from "joi"

export const createThreadSchema = Joi.object({
    content: Joi.string().max(150).allow(null),
    image: Joi.string().allow(null),
    author: Joi.number().required()
})

export const updateThreadSchema = Joi.object({
    content: Joi.string().max(150).allow(null),
    image: Joi.string().allow(null),
    updated_at: Joi.date().default(new Date())
})