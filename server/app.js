import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import appointmentRoutes from "./routes/appointment.routes.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

// Required for Render when using express-rate-limit
app.set("trust proxy", 1);

// Security middleware
app.use(helmet());

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://the-garage-hub.vercel.app",
];

// CORS
app.use(
  cors({
    origin(origin, callback) {
      // Allow Postman and server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
app.use(morgan("dev"));

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Garage Backend Running 🚀",
  });
});

// API Routes
app.use("/api/appointments", appointmentRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler (Always Last)
app.use(errorHandler);

export default app;