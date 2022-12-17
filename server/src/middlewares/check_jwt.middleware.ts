import { NextFunction, Request, Response } from "express";

export const checkJWT = (request: Request, response: Response, next: NextFunction) => {

    const { headers } = request;

    const bearerToken = headers["authorization"];

    if (!bearerToken.includes("Bearer ")) {
        throw new Error("Invalid json web token.");
    }

    next();
}

