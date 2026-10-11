import { Prisma } from "@prisma/client";
import prisma from "../config/prisma.js";
import { throwError } from "../utils/throwError.js";

export const fetchOrders = async (userId) => {
  const orders = await prisma.order.findMany({
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
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};

export const createOrder = async (userId) => {
  return await prisma.$transaction(async (tx) => {
    //fetch te user's cart and its prodcuts
    const cart = await tx.cart.findUnique({
      where: {
        userId: userId,
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                inventory: true,
              },
            },
          },
        },
      },
    });

    // 2. Validate the cart
    if (!cart || cart.items.length === 0) {
      throwError("Cart is empty", 400);
    }

    // 3. Validate quantities, check stock, and calculate total
    for (const item of cart.items) {
      if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
        throwError("Invalid cart item quantity", 400);
      }

      const inventory = item.product.inventory;

      if (!inventory || inventory.quantity < item.quantity) {
        throwError(`Insufficient stock for product: ${item.product.name}`, 400);
      }

      const itemTotal = new Prisma.Decimal(item.product.price.toString()).mul(
        item.quantity,
      );

      totalAmount = totalAmount.add(itemTotal);
    }

    // 4. Create the order and its items
    const order = await tx.order.create({
      data: {
        userId: userId,
        totalAmount: totalAmount,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // 5. Decrease stock safely
    // The quantity condition prevents overselling if requests
    // attempt to purchase the same stock concurrently.
    for (const item of cart.items) {
      const updatedInventory = await tx.inventory.updateMany({
        where: {
          productId: item.productId,
          quantity: {
            gte: item.quantity,
          },
        },
        data: {
          quantity: {
            decrement: item.quantity,
          },
        },
      });

      if (updatedInventory.count !== 1) {
        throwError(`Insufficient stock for product: ${item.product.name}`, 409);
      }
    }

    // 6. Clear the cart after successfully creating the order
    await tx.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    });

    return order;
  });
};

export const fetchOrder = async (userId, orderId) => {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId: userId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      payment: true,
    },
  });

  if (!order) {
    throwError("Order not found", 404);
  }

  return order;
};
