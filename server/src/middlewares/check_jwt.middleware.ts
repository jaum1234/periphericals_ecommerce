import { NextFunction, Request, Response } from "express";
import { isValid } from "../services/jwt";

export const checkJWT = (request: Request, response: Response, next: NextFunction) => {

    const { headers } = request;

    const bearerToken = headers["authorization"];

    try {
        if (!bearerToken) {
            throw new Error("No token provided.")
        }
    
        if (!bearerToken.includes("Bearer ")) {
            throw new Error("Invalid json web token.");
        }

        const token = bearerToken.split(" ")[1];

        isValid(token);

    } catch (err: any) {
        next(err);
        return;
    }
    
    next();
}

