import prisma from "../config/prisma.js";
import { throwError } from "../utils/throwError.js";



//Admin authorization
export const authorizationMiddleWare = async (req, res, next) => {
  try {
    // const { id, email, role } = req.user || {};
    const { email } = req.user || {};

    // check if JWT decoded has admin role
    // if (role?.toLowerCase() != "admin") {
    //   throwError("Not authorised", 401);
    // }

    //FIXME: supoose a jWT is created with user role, after it has been give ADMIN role, Jwt that created initially contains user role

    //check  if user exists
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || (user.roles && user.roles.includes("admin"))) {
      throwError("Not authorised", 401);
    }

    next();
  } catch (error) {
    next(error);
  }
};
