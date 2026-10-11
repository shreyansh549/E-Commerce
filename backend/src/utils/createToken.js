import jwt from "jsonwebtoken";
export const createAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      // role: user.role
      // Dont user role in JWT- Issue: supoose a jWT is created with user role, after it has been give ADMIN role, Jwt that created initially contains user role can't admin routes despite having admin roles
    },
    process.env.JWT_ACCESS_TOKEN_SCERET_KEY,
    {
      expiresIn: "1d",
    },
  );
};

export const verifyAccessToken = (token, secretKey) => {
  return jwt.verify(token, secretKey);
};


//TODO: revoke token on click or some logic
// export const invalidateToken =(token)