import { Router } from "express";
import ProductController from "../controllers/product.controller";
import { body } from "express-validator";

const router = Router();

router.post(
    "",
    body("code")
        .isString()
        .not().isEmpty()
        .trim().escape(),
    body("name")
        .isString()
        .not().isEmpty()
        .trim().escape(),
    body("description")
        .isString()
        .not().isEmpty()
        .trim().escape(),
    body("price")
        .isNumeric()
        .isFloat()
        .not().isEmpty()
        .trim().escape(),
    body("quantity")
        .isNumeric()
        .isInt()
        .not().isEmpty()
        .trim().escape(),
    body("image")
        .isString()
        .trim().escape(),
    ProductController.create);

router.get("", ProductController.list);

export default router;