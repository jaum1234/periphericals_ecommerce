import "dotenv/config";
import "reflect-metadata"
import { DataSource } from "typeorm"

const MySQLDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: ["src/models/**/*.entity.ts"],
    migrations: [],
    subscribers: [],
})

const SQLiteDataSource = new DataSource({
    type: "better-sqlite3",
    name: "default",
    database: ":memory:",
    synchronize: true,
    entities: ["src/models/**/*.entity.ts"]
});

let AppDataSource: DataSource;

if (process.env.NODE_ENV === "test") {
    AppDataSource = SQLiteDataSource;
} else {
    AppDataSource = MySQLDataSource;
}

export { AppDataSource };