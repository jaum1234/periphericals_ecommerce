import { NextFunction, Request, Response } from "express";
import { isValid } from "../jwt/jwt.service";

export const isAuth = (
    request: Request, 
    response: Response, 
    next: NextFunction
) => {

    const { headers } = request;

    const bearerToken = headers['authorization'];

    if (!bearerToken) {
        return response.status(401);
    }
    
    if (!bearerToken.includes("Bearer ")) {
        return response.status(401);
    }

    const token = bearerToken.split(" ")[1];

    if (!isValid(token)) {
        return response.status(401);
    }

    next();
}