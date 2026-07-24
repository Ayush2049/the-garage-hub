import rateLimit from "express-rate-limit";

export const appointmentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,

  max: 15,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Maximum 15 appointment requests are allowed per hour from this IP.",
  },
});