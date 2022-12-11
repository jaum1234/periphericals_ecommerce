import "dotenv/config";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../user/user.entity";
import { registrationDTO } from "./registration.dto";

export class RegistrationController {

    public repository: Repository<User>;

    public constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    public register = async (
        request: Request, 
        response: Response, 
        next: NextFunction
    ) => {
        const { body }: { body: registrationDTO } = request;

        await this.repository.save(body);

        jwt.sign({
                user: body.email 
            }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            }
        );

        return response.status(201)
    }
}

export default new RegistrationController();