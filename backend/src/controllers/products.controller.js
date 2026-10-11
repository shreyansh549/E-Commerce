import {
  addPaticularProduct,
  getAllProducts,
  getParticularProduct,
} from "../services/products.service.js";

export const getProducts = async (req, res, next) => {
  try {
    const fetchProducts = await getAllProducts();
    res.status(200).json({
      success: true,
      message: "fetch all products",
      data: fetchProducts,
    });
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params || {};
    const fetchedProduct = await getParticularProduct(id);

    return res.status(200).json({
      success: true,
      message: "fetched product",
      data: fetchedProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const addedProduct = await addPaticularProduct(req, res);
    return res.status(201).json({
      success: true,
      message: "Product gets added",
      data: addedProduct,
    });
  } catch (error) {
    next(error);
  }
};
