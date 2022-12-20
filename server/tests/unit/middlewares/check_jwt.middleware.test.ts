import { jest, describe, test, expect } from "@jest/globals";
import { checkJWT } from "../../../src/middlewares/check_jwt.middleware";
import * as jwtService from "../../../src/services/jwt";
import { logger } from "../../../src/services/pino";
import { MockRequest, MockResponse } from "../../helpers/http_mocks";

describe("# checkJWT module", () => {
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
    })
})