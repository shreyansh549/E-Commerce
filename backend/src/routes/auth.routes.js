import express from "express";

import { register, login } from "../controllers/auth.controller.js";  // control layer
import { validate} from "../middlewares/validation.middleware.js";  //validation 
import { loginSchema, registerSchema } from "../validators/auth.validators.js";   //validator

const router = express.Router();

// 1st parameter: Path ('/register')
// 2nd parameter: Middleware validate(registerSchema)
// 3rd parameter: Final route handler function - register

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema, login))

export default router;
