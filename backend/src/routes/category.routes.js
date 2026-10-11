import express from "express";
import {
  categoryList,
  createCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

// any role can fetch catogory list
router.get("/", categoryList);

export default router;
