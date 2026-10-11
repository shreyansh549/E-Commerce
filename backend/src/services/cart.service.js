import prisma from "../config/prisma.js";
import { throwError } from "../utils/throwError.js";

export const fetchCartItems = async (userId) => {
  const cart = await prisma.cart.findUnique({
    where: {
      userId: userId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart) {
    return {
      items: [],
    };
  }
  return cart;
};

//add only one quanity of product in cart

export const fetchAddToCart = async (userId, productId) => {
  //find users cart
  let cart = await prisma.cart.findUnique({
    where: {
      userId: userId,
    },
  });

  //create a cart if user doesn't have one
  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId,
      },
    });
  }

  //check product
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throwError("Product not found", 404);
  }

  //check inventory
  const inventory = await prisma.inventory.findUnique({
    where: {
      productId: productId,
    },
  });

  if (!inventory || inventory.quantity < 1) {
    throwError("Insufficient inventory", 400);
  }

  // add item
  const cartItem = await prisma.cartItem.upsert({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
    update: {
      quantity: {
        increment: 1,
      },
    },
    create: {
      cartId: cart.id,
      productId,
      quantity: 1,
    },
  });

  return cartItem;
};

export const fetchDeleteToCart = async (userId, productId) => {
  //find users cart
  const cart = await prisma.cart.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!cart) {
    throwError("Cart not found", 404);
  }
  // delte item
  const cartItem = await prisma.cartItem.delete({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  return cartItem;
};
