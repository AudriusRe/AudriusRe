import express from "express";
import userRouter from "./usersRouter.js";
import registrationRouter from "./registrationsRoutes.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/registrations", registrationRouter);

export default router;
