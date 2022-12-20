import { Request, Response, Router } from "express";
import registrationRouter from "./registration.routes";
import authenticationRouter from "./authentication.routes";
import productRouter from "./product.routes";
import { checkJWT } from "../middlewares/check_jwt.middleware";

const router = Router();

router.use(registrationRouter);
router.use(authenticationRouter);
router.use("/products", productRouter)

export default router;