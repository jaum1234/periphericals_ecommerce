import { Request, Response, Router } from "express";
import registrationRouter from "./registration.routes";
import authenticationRouter from "./authentication.routes";
import { checkJWT } from "../middlewares/check_jwt.middleware";

const router = Router();

router.get("/protected-route", checkJWT, (request: Request, response: Response) => {
    return response.json("Protected route.");
});

router.use(registrationRouter);
router.use(authenticationRouter);

export default router;