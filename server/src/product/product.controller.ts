import { Product } from "./product.entity";
import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { ProductDTO } from "./product.dto";

export class ProductController {

    public repository: Repository<Product>;

    public constructor() {
        this.repository = AppDataSource.getRepository(Product);
    }

    public fetchAll = async (
        request: Request, 
        response: Response, 
        next: NextFunction
    ): Promise<Response<any>> => {
        const { search } = request.query;

        let products;

        if (!search) 
            products = this.repository.find();
        else 
            products = this.repository.find({
                where: {
                    name: search as string,
                    description: search as string
                }
            });

        return response.status(200).json(products);
    }
    
    public create = async (
        request: Request, 
        response: Response, 
        next: NextFunction
    ) => {

        return response.status(201);
    }


}