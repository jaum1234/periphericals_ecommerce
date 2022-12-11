import { Router } from "express";
import authenticationController from "./authentication.controller";
import { body } from "express-validator";

const router = Router();

router.post(
    "/login", 
    body("email")
        .isEmail()
        .isString()
        .not().isEmpty()
        //.custom(isValidUser)
        .trim().escape(),
    body("password")
        .isString()
        .not().isEmpty()
        //.custom(isValidPassword)
        .trim().escape(),
    authenticationController.accessToken
);