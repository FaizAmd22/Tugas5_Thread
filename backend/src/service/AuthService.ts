import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import { loginSchema, registerSchema } from "../utils/validator/authValidator";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";
import ResponseError from "../error/responseError";

export default new (class AuthService {
    private readonly authrepository: Repository<User> = AppDataSource.getRepository(User);

    async register(req: Request, res: Response) {
        const { error, value } = registerSchema.validate(req.body)
        if(error) throw new ResponseError(500, "Something error while register!")
        if (!value.username || !value.fullname || !value.password) throw new ResponseError(400, "Data can't be empty!");
        
        const userCheck = await this.authrepository.countBy({ username: value.username });
        if (userCheck > 0) throw new ResponseError(400, "Username already exist!");
        
        const hash = await bcrypt.hash(value.password, 10);
        console.log(hash);

        await this.authrepository.save({
            username: value.username,
            password: hash,
            name: value.fullname,
        });
        
        const get = await this.authrepository.findOne({ where: { username: value.username } });

        const token = jwt.sign({ id: get.id, username: get.username }, process.env.SECRET_KEY, {
            expiresIn: "7d",
        });
        return {
            message: "Account created successfully",
            user: {
                id: get.id,
                username: get.username,
            },
            token: token,
        }
    }
    
    async login(req: Request, res: Response) {
        const data = {
            username: req.body.username,
            password: req.body.password,
        };
        if (!data.username && !data.password) {
            throw new ResponseError(401, "Data ca't be empty!")
        } else if (!data.username) {
            throw new ResponseError(401, "Username can't be empty!")
        } else if (!data.password) {
            throw new ResponseError(401, "Password can't be empty!")
        }

        const {error, value} = loginSchema.validate(data)
        console.log("value :", value) 
        const userCheck = await this.authrepository.findOne({
            where: { username: value.username },
            select: {
                id: true,
                username: true,
                password: true
            }
        });
        if (!userCheck) throw new ResponseError(401, "Username not registered yet!");
        console.log("userCheck :", userCheck)
        
        const isEqual = await bcrypt.compare(value.password, userCheck.password);
        if (!isEqual) throw new ResponseError(401, "Username or Password is not correct!");

        const token = jwt.sign({ id: userCheck.id, username: userCheck.username }, process.env.SECRET_KEY, {
            expiresIn: "7d",
        });
        return {
            message: "Login success",
            user: {
                id: userCheck.id,
                username: userCheck.username,
            },
            token: token,
        }
    }
})();
