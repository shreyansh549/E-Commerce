import express from "express";
import { authorizationMiddleWare } from "../middlewares/authorization.middleware.js";
import { addProduct } from "../controllers/products.controller.js";

const router = express.Router();

// only admin can get products
router.post("/", authorizationMiddleWare, addProduct);

export default router;
