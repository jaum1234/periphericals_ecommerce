import { jest, describe, test, afterEach, beforeEach, expect } from "@jest/globals";
import ProductController from "../../../src/controllers/product.controller";
import { ProductDTO } from "../../../src/dtos/product.dto";
import { MockRequest, MockResponse } from "../../helpers/http_mocks";
import { AppDataSource } from "../../../src/config/data_sources";
import ProductRepository from "../../../src/repositories/product.repository";
import { Product } from "../../../src/models/product.entity";


describe("# ProductController module", () => {

    beforeEach(async () => {
        await AppDataSource.initialize()
    });

    afterEach(async () => {
        await ProductRepository.clear()
        await AppDataSource.destroy();
        jest.clearAllMocks()
    });

    describe("## create method", () => {
        test("### Should create product successfully", async () => {

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

    describe("## list method", () => {
        test("### Should list all products", async () => {

            // Arrange
            const mockRequest: any = new MockRequest();
            const mockResponse: any = new MockResponse();
            const mockNextFunction: any = jest.fn();

            const mockProduct1: Product = {
                id: 1,
                code: "12345",
                name: "product name",
                description: "product description",
                price: 99.99,
                quantity: 1,
                image: ""
            };

            const mockProduct2: Product = {
                id: 2,
                code: "123456",
                name: "product name",
                description: "product description",
                price: 99.99,
                quantity: 1,
                image: ""
            };

            const mockProduct3: Product = {
                id: 3,
                code: "1234567",
                name: "product name",
                description: "product description",
                price: 99.99,
                quantity: 1,
                image: ""
            };

            const mockProductRepositoryFetchAll = jest.spyOn(ProductRepository, "fetchAll")
                .mockResolvedValue([
                    mockProduct1,
                    mockProduct2,
                    mockProduct3
                ]);

            const mockResponseStatus = jest.spyOn(mockResponse, "status");
            const mockResopnseJson = jest.spyOn(mockResponse, "json");

            // Act
            await ProductController.list(mockRequest, mockResponse, mockNextFunction);
            
            // Assert
            expect(mockProductRepositoryFetchAll).toBeCalled();

            expect(mockResponseStatus).toBeCalled();
            expect(mockResponseStatus).toBeCalledTimes(1);
            expect(mockResponseStatus).toBeCalledWith(200);
            
            expect(mockResopnseJson).toBeCalled();
            expect(mockResopnseJson).toBeCalledTimes(1);
            expect(mockResopnseJson).toBeCalledWith([mockProduct1, mockProduct2, mockProduct3]);
        });

        test("### Should only list the products that match the query parameter.", async () => {

            // Arrange
            const mockRequest: any = new MockRequest();
            mockRequest.query = {q: "product1"};
            const mockResponse: any = new MockResponse();
            const mockNextFunction: any = jest.fn();

            const mockProduct1: Product = {
                id: 1,
                code: "12345",
                name: "product1",
                description: "product description",
                price: 99.99,
                quantity: 1,
                image: ""
            };

            const mockProductRepositoryFetchAll = jest.spyOn(ProductRepository, "fetchAll")
                .mockResolvedValue([
                    mockProduct1
                ]);

            const mockResponseStatus = jest.spyOn(mockResponse, "status");
            const mockResopnseJson = jest.spyOn(mockResponse, "json");

            // Act
            await ProductController.list(mockRequest, mockResponse, mockNextFunction);
            
            // Assert
            expect(mockProductRepositoryFetchAll).toBeCalled();
            expect(mockProductRepositoryFetchAll).toBeCalledWith({
                name: String(mockRequest.query.q)
            });
            expect(mockProductRepositoryFetchAll).toBeCalledTimes(1);
            
            expect(mockResponseStatus).toBeCalled();
            expect(mockResponseStatus).toBeCalledTimes(1);
            expect(mockResponseStatus).toBeCalledWith(200);
            
            expect(mockResopnseJson).toBeCalled();
            expect(mockResopnseJson).toBeCalledTimes(1);
            expect(mockResopnseJson).toBeCalledWith([mockProduct1]);

            expect(mockProduct1.name).toEqual(mockRequest.query.q);
        });
    });

    describe("## show method", () => {
        test("### Should return product that match request id param.", async () => {
            // Arrange
            const mockRequest: any = new MockRequest();
            mockRequest.params = {id: 1};
            const mockResponse: any = new MockResponse();
            const mockNextFunction: any = jest.fn();

            const mockProduct1: Product = {
                id: 1,
                code: "12345",
                name: "product1",
                description: "product description",
                price: 99.99,
                quantity: 1,
                image: ""
            };

            const mockProductRepositoryFetch = jest.spyOn(ProductRepository, "fetch")
                .mockResolvedValue(mockProduct1);

            const mockResponseStatus = jest.spyOn(mockResponse, "status");
            const mockResponseJson = jest.spyOn(mockResponse, "json");

            // Act
            await ProductController.show(mockRequest, mockResponse, mockNextFunction);
            
            // Assert
            expect(mockProductRepositoryFetch).toBeCalled();
            expect(mockProductRepositoryFetch).toBeCalledWith({
                id: Number(mockRequest.params.id)
            });
            
            expect(mockResponseStatus).toBeCalled();
            expect(mockResponseStatus).toBeCalledWith(200);
            
            expect(mockResponseJson).toBeCalled();
            expect(mockResponseJson).toBeCalledWith(mockProduct1);
        })
    });

    describe("## update method", () => {
        test("### Should update a product successfully", async () => {

            // Arrange
            const mockBody: Partial<ProductDTO> = {
                code: "12345",
                name: "new name",
                description: "product description",
                price: 99.99,
                quantity: 1,
                image: ""
            }

            const mockRequest: any = new MockRequest();
            mockRequest.body = mockBody;
            mockRequest.params.id = {id: 1}

            const mockResponse: any = new MockResponse();
            const mockNextFunction: any = jest.fn();
	    
	    const cb = jest.fn(async (criteria: object, data: object) => {return});

            const mockProductRepositoryUpdate = jest.spyOn(ProductRepository, "update")
	    	.mockImplementation(cb);
            const mockResponseStatus = jest.spyOn(mockResponse, "status");
            const mockResponseEnd = jest.spyOn(mockResponse, "end");

            // Act
            await ProductController.update(mockRequest, mockResponse, mockNextFunction);

            // Assert
            expect(mockProductRepositoryUpdate).toBeCalled();
            expect(mockProductRepositoryUpdate).toBeCalledWith({
                id: Number(mockRequest.params.id)
	    }, mockBody)
            expect(mockResponseStatus).toBeCalled();
            expect(mockResponseStatus).toBeCalledWith(200);

            expect(mockResponseEnd).toBeCalled();
            expect(mockResponseEnd).toBeCalled();
        });
    });
});
