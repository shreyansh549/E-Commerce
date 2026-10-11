import {
  fetchOrders,
  createOrder,
  fetchOrder,
} from "../services/order.service.js";
import { throwError } from "../utils/throwError.js";

export const getOrders = async (req, res, next) => {
  try {
    const userId = req?.user?.id;

    if (!userId) {
      throwError("Authentication required", 401);
    }

    const fetchedOrders = await fetchOrders(userId);
    return res.status(200).json({
      message: "Fetched Order",
      success: true,
      data: fetchedOrders,
    });
  } catch (error) {
    next(error);
  }
};

export const addOrder = async (req, res, next) => {
  try {
    const userId = req?.user?.id;

    if (!userId) {
      throwError("Authentication required", 401);
    }

    const addedOrder = await createOrder(userId);

    return res.status(201).json({
      message: "Added order successfully",
      success: true,
      data: addedOrder,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const userId = req?.user?.id;

    if (!userId) {
      throwError("Authentication required", 401);
    }

    const orderId = Number(req.params.id);

    if (!Number.isInteger(orderId) || orderId <= 0) {
      throwError("Invalid order ID", 400);
    }

    const fetchedOrder = await fetchOrder(userId, orderId);
    return res.status(200).json({
      message: "Fetched a single Order",
      success: true,
      data: fetchedOrder,
    });
  } catch (error) {
    next(error);
  }
};

// GET /orders — Display the customer's order history.

// GET /orders/:id — Display individual order details.

// PATCH /orders/:id/cancel — Implement cancellation and inventory restoration.

// PATCH /orders/:id/status — Add admin order management.
