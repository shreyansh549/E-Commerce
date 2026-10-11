import { fetchCartItems, fetchAddToCart, fetchDeleteToCart } from "../services/cart.service.js";
import { throwError } from "../utils/throwError.js";

export const getCartItems = async (req, res, next) => {
  try {
    const userId = req?.user?.id;

    if (!userId) {
      throwError("Authentication required", 401);
    }

    const fetchedCartItems = await fetchCartItems(userId);
    return res.status(200).json({
      message: "Fetched Cart items",
      success: true,
      data: fetchedCartItems,
    });
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const userId = req?.user?.id;
    const productId = req?.body?.productId;

    if (!userId) {
      throwError("Authentication required", 401);
    }
    if (!productId) {
      throwError("Provide a valid Product Id", 400);
    }
    const producIdNumber = Number(productId);

    if (!Number.isInteger(producIdNumber)) {
      throwError("Provide correct product Id", 400);
    }

    const fetchedAddtoCart = await fetchAddToCart(userId, producIdNumber);
    return res.status(201).json({
      message: "Added to cart",
      success: true,
      data: fetchedAddtoCart,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteToCart = async (req, res, next) => {
  try {
    const userId = req?.user?.id;
    const productId = req?.params?.productId;

    if (!userId) {
      throwError("Authentication required", 401);
    }
    if (!productId) {
      throwError("Provide a valid Product Id", 400);
    }
    const producIdNumber = Number(productId);

    if (!Number.isInteger(producIdNumber)) {
      throwError("Provide correct product Id", 400);
    }

    const fetchedDeleteToCart = await fetchDeleteToCart(userId, producIdNumber);
    return res.status(201).json({
      message: "Added to cart",
      success: true,
      data: fetchedDeleteToCart,
    });
  } catch (error) {
    next(error);
  }
};
