import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { RegistrationDTO } from "../dtos/registration.dto";
import { UserRepository } from "../repositories/user.repository";
import { generateAccessToken } from "../services/jwt";
import bcrypt from "bcrypt";
import { logger } from "../services/pino";

export class RegistrationController {

    private repository: UserRepository;

    public constructor() {
        this.repository = new UserRepository();
    }

    public register = async (
        request: Request, 
        response: Response, 
        next: NextFunction
    ) => {
        const { body }: { body: RegistrationDTO } = request;

        let accessToken;

        try {
            if (body.password !== body.password_confirmation) {
                throw new Error("Wrong password.");
            }

            await this.repository.create({
                email: body.email,
                password: body.password
            });

            accessToken = await generateAccessToken({user: body.email});

        } catch (err) {
            next(err);
            return;
        }

        return response.status(201).json({
            access_token: accessToken
        });
    }
}

export default new RegistrationController();