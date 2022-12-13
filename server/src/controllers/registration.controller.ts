import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { RegistrationDTO } from "../dtos/registration.dto";
import { UserRepository } from "../repositories/user.repository";
import { generateAccessToken } from "../services/jwt";

export class RegistrationController {

    public repository: UserRepository;

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

            await this.repository.create(body);

            accessToken = generateAccessToken({user: body.email});

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