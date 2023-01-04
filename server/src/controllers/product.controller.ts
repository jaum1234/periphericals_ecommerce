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

    public list = async (request: Request, response: Response, next: NextFunction) => {
        const { query } = request;

        const search = query.q;

        let products;

        if (!search) {
            products = await ProductRepository.fetchAll();
            return response.status(200).json(products);
        }

        products = await ProductRepository.fetchAll({
            name: String(search)
        });

        return response.status(200).json(products);
    }

    public show = async (request: Request, response: Response, next: NextFunction) => {

        const { id } = request.params;

        const product = await ProductRepository.fetch({ id: Number(id) });

        return response.status(200).json(product);
    }
}

export default new ProductController();