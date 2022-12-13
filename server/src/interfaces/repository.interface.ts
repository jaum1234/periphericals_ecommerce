import { FindOptionsWhere } from "typeorm";

export interface Repository<T> {

    fetchAll(options?: FindOptionsWhere<T>): Promise<T[]>;

    fetch(whereOptions: FindOptionsWhere<T>): Promise<T>;

    create(data: any): Promise<void>;

    update(criteria:FindOptionsWhere<T>, newData: any): Promise<void>

    remove(criteria: FindOptionsWhere<T>): Promise<void>
}
