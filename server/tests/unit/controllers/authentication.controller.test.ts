import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";
import { RegistrationDTO } from "../../../src/dtos/registration.dto";
import UserRepository from "../../../src/repositories/user.repository";
import * as jwtService from "../../../src/services/jwt";
import { AppDataSource } from "../../../src/config/data_sources";
import { logger } from "../../../src/services/pino";
import { MockRequest, MockResponse } from "./HttpMock";
import { UserDTO } from "../../../src/dtos/user.dto";
import AuthenticationController from "../../../src/controllers/authentication.controller";
import { User } from "../../../src/models/user.entity";
import bcrypt from "bcrypt";

describe("Authentication Controller module", () => {


    beforeEach(async () => {
        await AppDataSource.initialize();

        await UserRepository.create({
            email: "random_email",
            password: "random_pass"
        });
    })

    afterEach(async () => {
        await UserRepository.clear();
        await AppDataSource.destroy();
        jest.clearAllMocks();
    })

    test("authenticate method - Should authenticate user", async () => {
        
        const body: UserDTO = {
            email: "random_email",
            password: "random_pass",
        }

        const mockRequest: any = new MockRequest();
        mockRequest.body = body;

        const mockResponse: any = new MockResponse();

        const next = jest.fn();

        const mockUserRepositoryFetch: any = jest.spyOn(UserRepository, "fetch");

        const mockBcryptCompare: any = jest.spyOn(bcrypt, "compare");

        const mockJwtGenerateAccessToken = jest.spyOn(jwtService, "generateAccessToken")
            .mockImplementation(async (payload: any) => "token");
            
        const mockResponseStatus = jest.spyOn(mockResponse, "status");
        const mockResponseJson = jest.spyOn(mockResponse, "json");

        const response = await AuthenticationController.authenticate(mockRequest, mockResponse, next);

        expect(mockUserRepositoryFetch).toBeCalledWith({email: body.email});
        expect(mockBcryptCompare).toBeCalled();
        expect(mockJwtGenerateAccessToken).toBeCalledWith({user: body.email});
        expect(response).toEqual(mockResponse);
        expect(mockResponseStatus).toBeCalledWith(200);
        expect(mockResponseJson).toBeCalledWith({access_token: "token"});
    });

});