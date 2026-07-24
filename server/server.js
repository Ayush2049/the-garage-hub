import dotenv from "dotenv";

dotenv.config();
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log("=====================================");
      console.log(`🚀 Server running`);
      console.log(`🌍 http://localhost:${PORT}`);
      console.log("=====================================");
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();