import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { authenticationDTO } from "./authentication.dto";
import jwt from "jsonwebtoken";

class AuthenticationController {

    public accessToken = async (
        request: Request, 
        response: Response,
        next: NextFunction
    ) => {

        const { body }: { body: authenticationDTO } = request;

        const accessToken = await jwt.sign({
            user: body.email
        }, process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
        });

        return response.status(200).json(accessToken);
    }
}

export default new AuthenticationController();