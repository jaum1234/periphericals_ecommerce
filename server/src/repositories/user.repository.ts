import { DeepPartial, FindManyOptions, FindOptionsWhere, ObjectID, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../models/user.entity";
import { Repository as IRepository } from "../interfaces/repository.interface";
import { RegistrationDTO } from "../dtos/registration.dto";

export class UserRepository implements IRepository<User> {

    
    public repository: Repository<User>;

    public constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    public fetchAll = async (options?: FindOptionsWhere<User>): Promise<User[]> => {
        return await this.repository.find({
            where: {
                ...options
            }
        });
    }

    public fetch = async (whereOptions: FindOptionsWhere<User>): Promise<User> => {
        return await this.repository.findOne({
            where: { ...whereOptions }
        })
    }

    public create = async (data: RegistrationDTO): Promise<void> => {

        const user = await this.fetch({email: data.email});

        if (user) {
            throw new Error("E-mail already in use.");
        }

        await this.repository.insert(data);
    }

    public update = async (criteria: FindOptionsWhere<User>, newData: any): Promise<void> => {
        await this.repository.update(criteria, newData);
    }

    public remove = async (criteria: FindOptionsWhere<User>): Promise<void> => {
        const user = await this.fetch(criteria);

        if (!user) {
            return;
        }

        await this.repository.delete(criteria);
    }
}