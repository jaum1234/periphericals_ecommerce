import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { AppDataSource } from "./config/data_sources";
import { logger } from "./services/pino";

import router from "./routes/index.routes";

export const app = express();

app.use(express.json());

app.use("/api/v1", router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err) {
        return response.status(404).send(err.stack);
    }

    next();
})



AppDataSource.initialize().then(() => {
    logger.info("Database connection initialized.");
}).catch(error => {
    logger.error(error)
})

