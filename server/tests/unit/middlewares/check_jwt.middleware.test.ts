import { jest, describe, test, expect, afterAll, afterEach } from "@jest/globals";
import { checkJWT } from "../../../src/middlewares/check_jwt.middleware";
import * as jwtService from "../../../src/services/jwt";
import { logger } from "../../../src/services/pino";
import { MockRequest, MockResponse } from "../../helpers/http_mocks";

describe("# checkJWT module", () => {

    afterEach(() => {
        jest.clearAllMocks();
    })

    test("Should successfully check jwt", () => {
        
        const mockRequest: any = new MockRequest();
        mockRequest.headers = {"authorization": "Bearer token"};

        const mockResponse: any = new MockResponse();
        const mockNext: any = jest.fn();

        const mockJwtServiceIsValid = jest.spyOn(jwtService, "isValid").mockImplementation(async () => "token");

        expect(() => {
            checkJWT(mockRequest, mockResponse, mockNext);
        }).not.toThrowError();

        expect(mockJwtServiceIsValid).toBeCalled();
        expect(mockJwtServiceIsValid).toBeCalledWith("token");
        expect(mockNext).toBeCalled();
    });

    test("Should throw error if bearer token is not provided", () => {
        const mockRequest: any = new MockRequest();
        mockRequest.headers = {};

        const mockResponse: any = new MockResponse();
        const mockNext: any = jest.fn();

        const mockJwtServiceIsValid = jest.spyOn(jwtService, "isValid").mockImplementation(async () => "token");

        checkJWT(mockRequest, mockResponse, mockNext);
      
        expect(mockJwtServiceIsValid).not.toBeCalled();
        expect(mockNext).toBeCalledWith(new Error("No token provided."));
    });

    test("Should throw error if bearer token is malformed", () => {
        const mockRequest: any = new MockRequest();
        mockRequest.headers = {"authorization": "Bear token"};

        const mockResponse: any = new MockResponse();
        const mockNext: any = jest.fn();

        const mockJwtServiceIsValid = jest.spyOn(jwtService, "isValid").mockImplementation(async () => "token");

        checkJWT(mockRequest, mockResponse, mockNext);
      
        expect(mockJwtServiceIsValid).not.toBeCalled();
        expect(mockNext).toBeCalledWith(new Error("Bearer token is malformed."));
    })

})