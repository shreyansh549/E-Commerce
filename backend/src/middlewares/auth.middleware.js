import { verifyAccessToken } from "../utils/createToken.js";

export const authMiddleWare = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    const error = new Error("Authentication required");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1] || null;

  if (!token) {
    const error = new Error("Invalid Authentication");
    error.statusCode = 401;
    throw error;
  }

  try {
    const decoded = verifyAccessToken(
      token,
      process.env.JWT_ACCESS_TOKEN_SCERET_KEY,
    );
    req.user = decoded;

    next();
  } catch {
    const error = new Error("Invalid or token expired");
    error.statusCode = 401;
    throw error;
  }
};
