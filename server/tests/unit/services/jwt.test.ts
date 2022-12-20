import { test, describe, jest, expect, afterEach } from "@jest/globals";
import * as jwtService from "../../../src/services/jwt";
import jwt from "jsonwebtoken";
import fs from "fs/promises";

describe("JWT module", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("generateAccessToken function - Should sign JWT", async () => {

        const mockFsReadFile = jest.spyOn(fs, "readFile");
        const mockJwtSign = jest.spyOn(jwt, "sign");

        const payload = {id: 1};
        await jwtService.generateAccessToken(payload, {issuer: "issuer", audience: "audience", expiresIn: "1h"});

        expect(mockFsReadFile).toBeCalledWith("private.key");
        expect(mockJwtSign).toBeCalled();

    });

    describe("isValid function", () => {

        test("Should successfully validate JWT", async () => {
            const payload = {id: 1};
            const options = {issuer: "issuer", audience: "audience", expiresIn: "1h"};
            const token = await jwtService.generateAccessToken(payload, options);
    
            const mockJwtVerify = jest.spyOn(jwt, "verify");
            const mockFsReadFile = jest.spyOn(fs, "readFile");
    
            await expect(jwtService.isValid(token)).resolves.not.toThrowError();
            expect(mockFsReadFile).toHaveBeenCalledWith("public.key");
            expect(mockJwtVerify).toHaveBeenCalled();
        });

        test("Should throw error because of malformed token", async () => {
            
            const mockJwtVerify = jest.spyOn(jwt, "verify");
            const mockFsReadFile = jest.spyOn(fs, "readFile");
            
            await expect(jwtService.isValid("random_string")).rejects.toThrowError();
            expect(mockFsReadFile).toHaveBeenCalledWith("public.key");
            expect(mockJwtVerify).toHaveBeenCalled();
        })

        test("Should throw error because of invalid issuer", async () => {
            const payload = {id: 1};
            const options = {issuer: "wrong_issuer", audience: "audience", expiresIn: "1h"};
            const token = await jwtService.generateAccessToken(payload, options);
    
            const mockJwtVerify = jest.spyOn(jwt, "verify");
            const mockFsReadFile = jest.spyOn(fs, "readFile");
    
            await expect(jwtService.isValid(token, {issuer: "issuer", audience: "audience"})).rejects.toThrowError();
            expect(mockFsReadFile).toHaveBeenCalledWith("public.key");
            expect(mockJwtVerify).toHaveBeenCalled();
        });

        test("Should throw error because of invalid audience", async () => {
            const payload = {id: 1};
            const options = {issuer: "issuer", audience: "wrong_audience", expiresIn: "1h"};
            const token = await jwtService.generateAccessToken(payload, options);
    
            const mockJwtVerify = jest.spyOn(jwt, "verify");
            const mockFsReadFile = jest.spyOn(fs, "readFile");
    
            await expect(jwtService.isValid(token, {issuer: "issuer", audience: "audience"})).rejects.toThrowError();
            expect(mockFsReadFile).toHaveBeenCalledWith("public.key");
            expect(mockJwtVerify).toHaveBeenCalled();
        });
    })


    
});