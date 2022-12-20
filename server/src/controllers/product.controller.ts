import { NextFunction, Request, Response } from "express";
import { ProductDTO } from "../dtos/product.dto";
import ProductRepository from "../repositories/product.repository";

class ProductController {
    
    public create = async (
        request: Request, 
        response: Response, 
        next: NextFunction
    ) => {

        const { body }: { body: ProductDTO } = request;

        try {
            await ProductRepository.create(body);
        } catch (err: any) {
            next(err);
            return
        }

        return response.status(201).end();
    }


}

export default new ProductController();