import * as Joi from "joi"

export const registerSchema = Joi.object({
    username: Joi.string().min(2).max(100).required(),
    fullname: Joi.string().max(100).required(),
    password: Joi.string().min(8).required()
})

export const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(8).required()
})

export const updateUserSchema = Joi.object({
    username: Joi.string().min(2).max(100).required(),
    fullname: Joi.string().max(100).required(),
    password: Joi.string().min(8).required(),
    picture: Joi.string().allow(null),
    cover_photo: Joi.string().allow(null),
    bio: Joi.string().max(50).allow(null)
})