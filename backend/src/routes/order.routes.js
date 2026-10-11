import express from "express";

const router = express.Router();

router.get("/orders",getOrders );
router.post("/orders",addOrder );


// POST   /orders
// GET    /orders
// GET    /orders/:orderId
// PATCH  /orders/:orderId/cancel

export default router;