import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import appointmentRoutes from "./routes/appointment.routes.js";
import errorHandler from "./middleware/error.middleware.js";
const app = express();

app.use(helmet());
const allowedOrigins = [
  "http://localhost:5173",
  "https://the-garage-hub.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g., Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/api/appointments", appointmentRoutes);
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Oil Company Backend Running 🚀",
  });
});

app.use("/api/appointments", appointmentRoutes);

// Error handler should always be last
app.use(errorHandler);
export default app;