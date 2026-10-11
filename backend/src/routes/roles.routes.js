import express from "express";
import { accessRoles, provideRole } from "../controllers/roles.controller.js";

const router = express.Router();

//provide a user to role
router.post("/", provideRole);

//check acces roles of ser
router.get("/", accessRoles);

export default router;
