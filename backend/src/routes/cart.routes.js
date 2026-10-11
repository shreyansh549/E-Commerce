import express from "express";
import { getCartItems, addToCart, deleteToCart } from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", getCartItems);

router.post("/items", addToCart);
router.delete("/items/:productId", deleteToCart)




//TODO:
// PATCH  /cart/items/:productId        → authenticated user
// DELETE /cart/items                   → authenticated user


export default router;
