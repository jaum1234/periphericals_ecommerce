import jwt, { VerifyOptions } from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export const generateAccessToken = (
    payload: string | object | Buffer,
    options?: SignOptions
): string => {

    return jwt.sign(payload, secret, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
        ...options
    });
}

export const isValid = (token: string, options?: VerifyOptions) => {
    return jwt.verify(token, secret, options);
}
