import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { AppDataSource } from "./data-source"
import { logger } from "./services/pino";
import router from "./routes/index.routes";

export const app = express();

app.use(express.json());

app.use("/api", router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err) {
        return response.send(err);
    }

    next();
})

AppDataSource.initialize().then(async () => {
   
    app.listen(
        process.env.APP_PORT, 
        () => logger.info("App running on port " + process.env.APP_PORT)
    );

}).catch(error => logger.error(error))
