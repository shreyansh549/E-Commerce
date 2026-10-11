import prisma from "../config/prisma.js";
import { throwError } from "../utils/throwError.js";

export const getAllProducts = async () => {
  const allProducts = await prisma.product.findMany();

  return allProducts;
};

export const getParticularProduct = async (id) => {
  const productId = Number(id);
  if (!productId) {
    throwError("Provide productId1", 400);
  }
  const productDetails = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  return productDetails;
};

//only admin can add products
export const addPaticularProduct = async (req, res) => {
  const { name, price, description, categoryId } = req.body || {};
  const categoryIdNumber = Number(categoryId);

  if (!Number.isInteger(categoryIdNumber)) {
    throwError("Invalid category id", 400);
  }

  const mappedCategory = await prisma.category.findUnique({
    where: {
      id: categoryIdNumber,
    },
  });

  if (!mappedCategory) {
    throwError("Category id doesn't match", 400);
  }

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      categoryId: categoryIdNumber,
    },
  });

  return product;
};
