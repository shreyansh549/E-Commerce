import { fetchAllCategory, addCategory } from "../services/cateogy.service.js";
import { throwError } from "../utils/throwError.js";

export const categoryList = async (req, res, next) => {
  try {
    const fetchedCategoryList = await fetchAllCategory();

    return res.status(200).json({
      message: "Category list fetched succesfully",
      success: true,
      data: fetchedCategoryList,
    });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      throwError("Category name is missing", 400);
    }
    const addedCategory = await addCategory(name ,next);

    return res.status(201).json({
      message: "Category created succesfully",
      success: true,
      data: addedCategory,
    });
  } catch (error) {
    next(error);
  }
};
