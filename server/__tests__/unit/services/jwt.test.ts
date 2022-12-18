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

    test("isValid function - Should validate JWT", async () => {

        const payload = {id: 1};
        const options = {issuer: "issuer", audience: "audience", expiresIn: "1h"};
        const token = await jwtService.generateAccessToken(payload, options);

        const mockJwtVerify = jest.spyOn(jwt, "verify");
        const mockFsReadFile = jest.spyOn(fs, "readFile");

        await jwtService.isValid(token);

        expect(mockFsReadFile).toBeCalledWith("public.key");
        expect(mockJwtVerify).toBeCalled();
    })
    
});