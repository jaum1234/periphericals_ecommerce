import "dotenv/config";
import express from "express";
import { AppDataSource } from "./data-source"

const app = express();

app.use(express.json());

AppDataSource.initialize().then(async () => {
   
    app.listen(
        process.env.APP_PORT, 
        () => console.log("App running on port " + process.env.APP_PORT)
    );

}).catch(error => console.log(error))
