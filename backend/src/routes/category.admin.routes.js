import express from "express";
import { createCategory } from "../controllers/category.controller.js";
import { authorizationMiddleWare } from "../middlewares/authorization.middleware.js";

const router = express.Router();

// only admin can add a category
router.post("/", authorizationMiddleWare, createCategory);

export default router;
