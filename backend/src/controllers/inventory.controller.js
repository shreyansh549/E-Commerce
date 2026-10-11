import {
  fetchAddInventory,
  fetchInventory,
  fetchQuantityOfProduct,
  fetchRemoveInventory,
  fetchUpdateInventory,
} from "../services/inventory.service.js";
import { throwError } from "../utils/throwError.js";

export const getQuantityOfProduct = async (req, res, next) => {
  try {
    const { productId } = req.params || {};
    if (!productId) {
      throwError("Provide product Id", 400);
    }
    const producIdNumber = Number(productId);

    if (!Number.isInteger(producIdNumber)) {
      throwError("Provide correct product Id", 400);
    }
    const fetchedQuantityOfProduct =
      await fetchQuantityOfProduct(producIdNumber);

    return res.status(200).json({
      message: "Quanity of a product fetched succesfully",
      success: true,
      data: fetchedQuantityOfProduct,
    });
  } catch (error) {
    next(error);
  }
};


//TODO:
// export const deductQuantityOnCheckout = async (req, res, next) => {
//   try {
//     const { items } = req.body || {};
//   } catch (error) {
//     next(error);
//   }
// };

//admin controller
export const getInventory = async (req, res, next) => {
  try {
    const fetchedInventory = await fetchInventory();
    return res.status(200).json({
      message: "fetched Inventory List",
      success: true,
      data: fetchedInventory,
    });
  } catch (error) {
    next(error);
  }
};

export const addInventory = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body || {};

    if (!productId || !quantity) {
      throwError("Provide product Id and Quantity", 400);
    }
    const producIdNumber = Number(productId);
    const quantityNumber = Number(quantity);

    if (
      !Number.isInteger(producIdNumber) ||
      !Number.isInteger(quantityNumber)
    ) {
      throwError("Provide correct product Id and quantity", 400);
    }

    const fetchedAddedInventory = await fetchAddInventory(
      producIdNumber,
      quantityNumber,
    );

    return res.status(201).json({
      message: "Added Inventory succesfully",
      success: true,
      data: fetchedAddedInventory,
    });
  } catch (error) {
    next(error);
  }
};

export const removeInventory = async (req, res, next) => {
  try {
    const { productId } = req.body || {};

    if (!productId) {
      throwError("Provide product Id ", 400);
    }
    const producIdNumber = Number(productId);

    if (!Number.isInteger(producIdNumber)) {
      throwError("Provide correct product Id", 400);
    }

    const fetchedRemoveInventory = await fetchRemoveInventory(producIdNumber);

    return res.status(201).json({
      message: "Removed Inventory succesfully",
      success: true,
      data: fetchedRemoveInventory,
    });
  } catch (error) {
    next(error);
  }
};

export const updateInventory = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body || {};

    if (!productId || !quantity) {
      throwError("Provide product Id and Quantity", 400);
    }
    const producIdNumber = Number(productId);
    const quantityNumber = Number(quantity);

    if (
      !Number.isInteger(producIdNumber) ||
      !Number.isInteger(quantityNumber)
    ) {
      throwError("Provide correct product Id and quantity", 400);
    }

    const fetchedUpdatedInventory = await fetchUpdateInventory(
      producIdNumber,
      quantityNumber,
    );

    return res.status(201).json({
      message: "Added Inventory succesfully",
      success: true,
      data: fetchedUpdatedInventory,
    });
  } catch (error) {
    next(error);
  }
};
