import { registerUser } from "../services/auth.service.js";
import { loginUser } from "../services/auth.service.js";

export const register = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      success: true,
      message: "user created succefully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const loggedInUser = await loginUser(req.body);
    res.status(200).json({
      success: true,
      message: "user logged in succesfully",
      data: loggedInUser,
    });
  } catch (error) {
    next(error);
  }
};
