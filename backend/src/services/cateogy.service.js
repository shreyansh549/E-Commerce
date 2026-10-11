import prisma from "../config/prisma.js";
import { throwError } from "../utils/throwError.js";

export const fetchAllCategory = () => {
  return prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
};

export const fetchCategoryById = (req, res, next) => {
  const { id } = req;
  return prisma.category.findOne({
    where: {
      id: id,
    },
  });
};

export const addCategory = async (name, next) => {
  try {
    return await prisma.category.create({ data: { name } });
  } catch (error) {
    if (error.code === "P2002") {
      throwError("Category already exists", 409);
    }
    next(error);
  }
};
