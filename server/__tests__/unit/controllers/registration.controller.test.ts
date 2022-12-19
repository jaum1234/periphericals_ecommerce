import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";
import RegistrationController from "../../../src/controllers/registration.controller";
import { RegistrationDTO } from "../../../src/dtos/registration.dto";
import { UserRepository } from "../../../src/repositories/user.repository";
import * as jwtService from "../../../src/services/jwt";
import { AppDataSource } from "../../../src/data-source";
import { logger } from "../../../src/services/pino";
import { MockRequest, MockResponse } from "./HttpMock";

describe("Registration Controller module", () => {

    let userRepository: UserRepository;

    beforeEach(async () => {
        await AppDataSource.initialize();
        userRepository = new UserRepository();
    })

    afterEach(async () => {
        await userRepository.clear();
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

        //const mockCreate = jest.spyOn(userRepository, "create").mockImplementation(async () => {return});
        const mockJwt = jest.spyOn(jwtService, "generateAccessToken").mockImplementation(async () => "token");

        const response = await RegistrationController.register(mockRequest, mockResponse, next);

        const data = {email: mockRequest.body.email, password: mockRequest.body.password};

        //expect(mockCreate).toBeCalledWith(data);
        expect(mockJwt).toBeCalledWith({user: body.email});
        expect(response).toEqual(mockResponse)

    });

});