import express from "express";
import {
  addInventory,
  getInventory,
  removeInventory,
  updateInventory,
} from "../controllers/inventory.controller.js";
import { authorizationMiddleWare } from "../middlewares/authorization.middleware.js";
const router = express.Router();

router.get("/", authorizationMiddleWare, getInventory);
router.post("/add", authorizationMiddleWare, addInventory);
router.post("/remove", authorizationMiddleWare, removeInventory);
router.patch("/update", authorizationMiddleWare, updateInventory);


export default router;
