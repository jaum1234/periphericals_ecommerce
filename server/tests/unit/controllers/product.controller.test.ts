import { jest, describe, test, afterEach, beforeEach, expect } from "@jest/globals";
import ProductController from "../../../src/controllers/product.controller";
import { ProductDTO } from "../../../src/dtos/product.dto";
import { MockRequest, MockResponse } from "../../helpers/http_mocks";
import { AppDataSource } from "../../../src/config/data_sources";
import ProductRepository from "../../../src/repositories/product.repository";

describe("# ProductController module", () => {

    beforeEach(async () => {
        await AppDataSource.initialize()
    });

    afterEach(async () => {
        await ProductRepository.clear()
        await AppDataSource.destroy();
        jest.clearAllMocks()
    });

    describe("create method", () => {
        test("Should create product successfully", async () => {

            const mockBody: ProductDTO = {
                code: "12345",
                name: "product name",
                description: "product description",
                price: 99.99,
                quantity: 1,
                image: ""
            }

            const mockRequest: any = new MockRequest();
            mockRequest.body = mockBody;

            const mockResponse: any = new MockResponse();
            const mockNextFunction: any = jest.fn();

            const mockProductRepositoryCreate = jest.spyOn(ProductRepository, "create");
            const mockResponseStatus = jest.spyOn(mockResponse, "status");
            const mockResponseEnd = jest.spyOn(mockResponse, "end");

            await ProductController.create(mockRequest, mockResponse, mockNextFunction);

            expect(mockProductRepositoryCreate).toBeCalledWith(mockBody)
            expect(mockResponseStatus).toBeCalledWith(201);
            expect(mockResponseEnd).toBeCalled();
            expect(mockNextFunction).not.toBeCalled();
        });
    });
});