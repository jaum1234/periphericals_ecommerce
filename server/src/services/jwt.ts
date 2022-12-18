import jwt, { VerifyOptions, SignOptions, Jwt, JwtPayload } from "jsonwebtoken";
import fs from "fs/promises";

export const generateAccessToken = async (
    payload: string | object | Buffer,
    options?: SignOptions
): Promise<string> => {

    const privateKey = await fs.readFile("private.key");

    return jwt.sign(payload, privateKey, {
        algorithm: "RS256",
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE_IN as string,
        audience: process.env.JWT_AUDIENCE as string,
        issuer: process.env.JWT_ISSUER as string,
        ...options
    });
}

export const isValid = async (
    token: string, 
    options?: VerifyOptions
): Promise<string | Jwt | JwtPayload> => {

    const publicKey = await fs.readFile("public.key");

    return jwt.verify(token, publicKey, {
        algorithms: ["RS256"],
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE,
        ...options
    });
}

