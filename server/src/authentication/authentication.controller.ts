import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { authenticationDTO } from "./authentication.dto";
import jwt from "jsonwebtoken";
import { userRepositoy } from "../user/user.repository";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../jwt/jwt.service";
class AuthenticationController {

    public accessToken = async (
        request: Request, 
        response: Response,
        next: NextFunction
    ) => {

        const { body }: { body: authenticationDTO } = request;

        const user = await userRepositoy.findOne({
            where: {
                email: body.email
            }
        });

        if (!user) throw new Error("Email or password is incorrect.");

        const isCorrectPassoword = await bcrypt.compare(body.password, user.password);

        if (!isCorrectPassoword) throw new Error("Email or password is incorrect.");

        const accessToken = generateAccessToken({user: body.email});

        return response.status(200).json(accessToken);
    }
}

export default new AuthenticationController();