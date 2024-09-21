import express from "express";
import {
  createNewRegistration,
  deleteRegistration,
  getRegistrations,
  updateRegistration,
} from "../controllers/registrationsController.js";
import { validateRegistrationBody } from "../middleware/registrationBodyValidation.js";
import { validateIdParam } from "../middleware/validateIdParam.js";

const router = express.Router();

router.get("/registrations", getRegistrations);

router.post("/registrations", validateRegistrationBody, createNewRegistration);

router.put(
  "/registrations/:id",
  validateIdParam,
  validateRegistrationBody,
  updateRegistration
);

router.delete("/registrations/:id", validateIdParam, deleteRegistration);

export default router;
