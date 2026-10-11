import express from "express";
import { getQuantityOfProduct } from "../controllers/inventory.controller.js";

const router = express.Router();

router.get("/:productId", getQuantityOfProduct);

// checkout and stock dedcution

//TODO:
// router.post("/orders", deductQuantityOnCheckout);


export default router;
