import { jest, describe, test, afterEach, beforeEach, expect } from "@jest/globals";
import { Repository } from "typeorm";
import { AppDataSource } from "../../../src/config/data_sources";
import { ProductDTO } from "../../../src/dtos/product.dto";
import { Product } from "../../../src/models/product.entity";
import ProductRepository from "../../../src/repositories/product.repository";

describe("# ProductRepository module", () => {

    let typeOrmRepository: Repository<Product>;

    beforeEach(async () => {
        typeOrmRepository = AppDataSource.getRepository(Product);
        await AppDataSource.initialize();
    })

    afterEach(async () => {
        jest.clearAllMocks();
        await ProductRepository.clear();
        await AppDataSource.destroy();
    });

    describe("## create method", () => {
        test("Shoud create product successfully", async () => {

            const data: ProductDTO = {
                code: "12345",
                description: "product description",
                name: "product name",
                price: 99.99,
                quantity: 1,
                image: ""
            };

            const mockProductRepositoryInsert = jest.spyOn(typeOrmRepository, "insert");

            await ProductRepository.create(data);

            expect(mockProductRepositoryInsert).toBeCalled();
            expect(mockProductRepositoryInsert).toBeCalledTimes(1);
            expect(mockProductRepositoryInsert).toBeCalledWith(data);
        });
    });
});