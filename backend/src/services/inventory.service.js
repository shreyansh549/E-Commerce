import prisma from "../config/prisma.js";
import { throwError } from "../utils/throwError.js";

export const fetchQuantityOfProduct = async (productId) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throwError("No such product Id found", 400);
  }
  const inventory = await prisma.inventory.findUnique({
    where: {
      productId,
    },
    select: {
      productId: true,
      quantity: true,
      product: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!inventory) {
    throwError("Inventory not found", 404);
  }

  return {
    productId: inventory.productId,
    productName: inventory.product?.name,
    quantity: inventory.quantity,
  };
};

export const fetchInventory = async () => {
  const allInventory = await prisma.inventory.findMany({
    select: {
      productId: true,
      quantity: true,
      product: {
        select: {
          name: true,
          price: true,
        },
      },
    },
    orderBy: {
      product: {
        name: "asc",
      },
    },
  });

  return allInventory.map((inventory) => ({
    productId: inventory.productId,
    productName: inventory.product?.name,
    producPrice: inventory.product?.price,
    quantity: inventory.quantity,
  }));
};

export const fetchAddInventory = async (productId, quantity) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    throwError("Provide a valid Product Id", 400);
  }

  const addQuantityToProduct = await prisma.inventory.create({
    data: {
      productId,
      quantity,
    },
  });

  return addQuantityToProduct;
};

export const fetchRemoveInventory = async (productId) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    throwError("Provide a valid Product Id", 400);
  }

  const removeQuantityToProduct = await prisma.inventory.update({
    where: {
      productId: productId,
    },
    data: {
      quantity: 0,
    },
  });

  return removeQuantityToProduct;
};

export const fetchUpdateInventory = async (productId, quantity) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    throwError("Provide a valid Product Id", 400);
  }

  const updateQuantityToProduct = await prisma.inventory.update({
    where: {
      productId: productId,
    },
    data: {
      quantity: quantity,
    },
  });

  return updateQuantityToProduct;
};
