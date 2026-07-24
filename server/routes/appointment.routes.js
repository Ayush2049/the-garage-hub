import { Router } from "express";
import { body } from "express-validator";

import { createAppointment } from "../controllers/appointment.controller.js";
import validateRequest from "../middleware/validateRequest.js";
import { appointmentLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post(
  "/",

  appointmentLimiter,

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("phone")
    .trim()
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be exactly 10 digits")
    .isNumeric()
    .withMessage("Phone number must contain only digits"),

  body("make")
    .trim()
    .notEmpty()
    .withMessage("Vehicle make is required"),

  body("model")
    .trim()
    .notEmpty()
    .withMessage("Vehicle model is required"),

  body("issue")
    .trim()
    .notEmpty()
    .withMessage("Issue is required"),

  body("preferredDate")
    .notEmpty()
    .withMessage("Preferred date is required"),

  body("preferredTime")
    .notEmpty()
    .withMessage("Preferred time is required"),

  validateRequest,

  createAppointment
);

export default router;