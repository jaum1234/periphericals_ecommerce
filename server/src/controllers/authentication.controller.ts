import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { AuthenticationDTO } from "../dtos/authentication.dto";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../services/jwt";
import { UserRepository } from "../repositories/user.repository";
import { logger } from "../services/pino";
class AuthenticationController {

    public repository: UserRepository;

    public constructor() {
        this.repository = new UserRepository();
    }

    public accessToken = async (
        request: Request, 
        response: Response,
        next: NextFunction
    ) => {

        const { body }: { body: AuthenticationDTO } = request;

        const user = await this.repository.fetch({email: body.email});

        if (!user) throw new Error("Email or password is incorrect.");

        const isCorrectPassoword = await bcrypt.compare(body.password, user.password);

        if (!isCorrectPassoword) throw new Error("Email or password is incorrect.");

        const accessToken = generateAccessToken({user: body.email});

        return response.status(200).json({
            access_token: accessToken
        });
    }
}

export default new AuthenticationController();