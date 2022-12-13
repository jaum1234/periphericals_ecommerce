import "dotenv/config";
import "reflect-metadata"
import { DataSource } from "typeorm"
import { Category } from "./models/category.entity";
import { Product } from "./models/product.entity";
import { Role } from "./models/role.entity";
import { User } from "./models/user.entity"

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
