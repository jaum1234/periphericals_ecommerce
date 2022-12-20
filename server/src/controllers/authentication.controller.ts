import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { UserDTO } from "../dtos/user.dto";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../services/jwt";
import UserRepository from "../repositories/user.repository";
import { logger } from "../services/pino";
class AuthenticationController {


    public authenticate = async (
        request: Request, 
        response: Response,
        next: NextFunction
    ) => {

        const { body }: { body: UserDTO } = request;

        let accessToken;

        try {
            const user = await UserRepository.fetch({email: body.email});

            if (!user) throw new Error("Email or password is incorrect.");
    
            const isCorrectPassoword = await bcrypt.compare(body.password, user.password);
    
            if (!isCorrectPassoword) throw new Error("Email or password is incorrect.");
    
            accessToken = await generateAccessToken({user: body.email});
        } catch (err: any) {
            next(err);
            return;
        }
        

        return response.status(200).json({
            access_token: accessToken
        });
    }
}

export default new AuthenticationController();