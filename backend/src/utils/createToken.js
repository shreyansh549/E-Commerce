import jwt from "jsonwebtoken";
export const createAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_ACCESS_TOKEN_SCERET_KEY,
    {
      expiresIn: "30m",
    },
  );
};
