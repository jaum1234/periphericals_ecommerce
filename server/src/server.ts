import "dotenv/config";
import { logger } from "./services/pino";
import { app } from ".";

app.listen(process.env.APP_PORT, () => {
    logger.info("App running on port " + process.env.APP_PORT);
})

