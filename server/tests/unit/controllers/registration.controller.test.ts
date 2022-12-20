import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";
import RegistrationController from "../../../src/controllers/registration.controller";
import { RegistrationDTO } from "../../../src/dtos/registration.dto";
import UserRepository from "../../../src/repositories/user.repository";
import * as jwtService from "../../../src/services/jwt";
import { AppDataSource } from "../../../src/config/data_sources";
import { logger } from "../../../src/services/pino";
import { MockRequest, MockResponse } from "../../helpers/http_mocks";

describe("Registration Controller module", () => {


    beforeEach(async () => {
        await AppDataSource.initialize();
    })

    afterEach(async () => {
        await UserRepository.clear();
        await AppDataSource.destroy();
        jest.clearAllMocks();
    })

    test("register method - Should register user", async () => {
        
        const body: RegistrationDTO = {
            email: "random_email",
            password: "random_pass",
            password_confirmation: "random_pass"
        }

        const mockRequest: any = new MockRequest();
        mockRequest.body = body;

        const mockResponse: any = new MockResponse();

        const next = jest.fn();

        const mockCreate = jest.spyOn(UserRepository, "create");
        const mockJwtGenerateAccessToken = jest.spyOn(jwtService, "generateAccessToken")
            .mockImplementation(async (payload: any) => "token");
        const mockResponseStatus = jest.spyOn(mockResponse, "status");
        const mockResponseJson = jest.spyOn(mockResponse, "json");

        const response = await RegistrationController.register(mockRequest, mockResponse, next);

        expect(mockCreate).toBeCalled();
        expect(mockJwtGenerateAccessToken).toBeCalledWith({user: body.email});
        expect(response).toEqual(mockResponse);
        expect(mockResponseStatus).toBeCalledWith(201);
        expect(mockResponseJson).toBeCalledWith({access_token: "token"});
    });

});