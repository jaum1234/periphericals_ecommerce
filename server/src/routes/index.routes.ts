import { Router } from "express";
import registrationRouter from "./registration.routes";

const router = Router();

router.use(registrationRouter);



export default router;