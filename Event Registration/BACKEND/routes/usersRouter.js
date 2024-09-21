import express from "express";
import {
  getUsers,
  loginUser,
  registerNewUser,
} from "../controllers/userController.js";
import { validateJwt } from "../middleware/validateJwtMiddleware.js";
import { validateUserRegistration } from "../middleware/userValidation.js";

const router = express.Router();

router.post("/register", validateUserRegistration, registerNewUser);
router.post("/login", loginUser);
router.get("/users", validateJwt, getUsers);

export default router;
