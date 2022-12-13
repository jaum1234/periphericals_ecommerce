import { Router } from "express";
import registrationController from "../controllers/registration.controller";
import { body } from "express-validator";

const router = Router();

router.post(
    "/register", 
    body("email")
        .isEmail()
        .isString()
        .not().isEmpty()
        //.custom(isValidEmail)
        .trim().escape(),
    body("password")
        .isString()
        .not().isEmpty()
        .trim().escape(),
    body("confirmation_password")
        .isString()
        .not().isEmpty()
        //.custom(confirmPassword)
        .trim().escape(),
    registrationController.register
);

export default router;