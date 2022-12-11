import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "./user.entity";

class UserRepository {
    
    public repository: Repository<User>;

    public constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    public fetch = async (whereOptions: FindOptionsWhere<User>): Promise<User> => {
        return await this.repository.findOne({
            where: { ...whereOptions }
        })
    }

    public store = async (data: DeepPartial<User>[]): Promise<void> => {
        await this.repository.save(data);
    }
}