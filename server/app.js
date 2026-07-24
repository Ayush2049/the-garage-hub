import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import appointmentRoutes from "./routes/appointment.routes.js";
import errorHandler from "./middleware/error.middleware.js";
const app = express();

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5173",
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