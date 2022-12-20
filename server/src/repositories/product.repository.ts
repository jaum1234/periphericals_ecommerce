import { Repository as IRepository } from "../interfaces/repository.interface";
import { Product } from "../models/product.entity";
import { ProductDTO } from "../dtos/product.dto";
import { AppDataSource } from "../config/data_sources";
import { Repository } from "typeorm";

class ProductRepository implements IRepository<Product>
{
    private repository: Repository<Product>;

    public constructor()
    {
        this.repository = AppDataSource.getRepository(Product);
    }

    public create = async (data: ProductDTO): Promise<void> => {
        await this.repository.insert(data);
    }

    public fetchAll = async (): Promise<Product[]> => {
        return;
    }

    public fetch = async (): Promise<Product> => {
        return;
    }

    public update = async (): Promise<void> => {
        return
    }

    public remove = async (): Promise<void> => {
        return;
    }

    public clear = async (): Promise<void> => {
        await this.repository.clear();
    }
}

export default new ProductRepository();