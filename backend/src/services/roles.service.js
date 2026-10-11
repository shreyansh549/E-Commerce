import prisma from "../config/prisma.js";
import { throwError } from "../utils/throwError.js";
import pkg from "@prisma/client";
const { Role } = pkg;

//fetch all roles
export const fetchAccessList = async (email) => {
  if (typeof email !== "string" || !email.trim()) {
    throwError("Provide an email", 400);
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email.trim().toLowerCase(),
    },
    select: { id: true, email: true, roles: true },
  });

  if (!user) {
    throwError("User not found", 404);
  }

  return { id: user.id, email: user.email, roles: [user.roles] };
};

//add  role to exisitng user
export const addRole = async (email, role) => {
  if (typeof email !== "string" || !email.trim()) {
    throwError("Provide an email", 400);
  }
  if (!role) {
    throwError("Provide a role", 400);
  }
  if (!Object.values(Role).includes(role)) {
    throwError("Invalid role", 400);
  }

  const user = await prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() },
    select: { id: true, roles: true },
  });

  if (!user) throwError("User not found", 404);
  if (user.roles.includes(role)) throwError(`User already has ${role}`, 409);

  if (!user) {
    throwError("User not found", 404);
  }

  return prisma.user.update({
    where: { id: user.id },
    data: { roles: { push: role } },
    select: { id: true, name: true, email: true, roles: true },
  });
};

//delete a role to a existing user
