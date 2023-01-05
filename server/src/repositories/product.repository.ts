import { Repository as IRepository } from "../interfaces/repository.interface";
import { Product } from "../models/product.entity";
import { ProductDTO } from "../dtos/product.dto";
import { AppDataSource } from "../config/data_sources";
import { FindOptionsWhere, Repository } from "typeorm";

class ProductRepository implements IRepository<Product>
{
    private repository: Repository<Product>;

    public constructor()
    {
        this.repository = AppDataSource.getRepository(Product);
    }

    public create = async (data: ProductDTO): Promise<void> => {
        
	const product = await this.fetch({code: data.code});

	if (product) {
	    throw new Error("Product already registered.");
	}

	await this.repository.insert(data);
    }

    public fetchAll = async (options?: FindOptionsWhere<Product>): Promise<Product[]> => {        
        if (!options) {
            return await this.repository.find();
        }
        
        return await this.repository.find({
            where: {
                ...options
            }
        });
    }

    public fetch = async (options: FindOptionsWhere<Product>): Promise<Product> => {
        const product = await this.repository.findOne({
            where: {
                ...options
            }
        });

        return product;
    }

    public update = async (
        criteria: FindOptionsWhere<Product>, 
        data: Partial<ProductDTO>
    ): Promise<void> => {
        
        await this.repository.update(criteria, data);
    }

    public remove = async (criteria: FindOptionsWhere<Product>): Promise<void> => {
        await this.repository.delete(criteria);

    }

    public clear = async (): Promise<void> => {
        await this.repository.clear();
    }
}

export default new ProductRepository();
