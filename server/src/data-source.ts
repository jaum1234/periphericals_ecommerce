import "dotenv/config";
import "reflect-metadata"
import { DataSource } from "typeorm"
import { Category } from "./category/category.entity";
import { Product } from "./product/product.entity";
import { Role } from "./role/role.entity";
import { User } from "./user/user.entity"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [
        User,
        Product,
        Role,
        Category
    ],
    migrations: [],
    subscribers: [],
})
