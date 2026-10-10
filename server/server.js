import express from "express";
import "dotenv/config";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { testDbConnection } from "./src/config/pooldb.js";
import authRoutes from "./src/routes/auth.route.js";


const PORT = process.env.PORT;
const app = express();

// Middleware
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: `Server is running on localhost:${PORT}` });
});

app.listen(PORT, async () => {
  await testDbConnection();
  console.log(`Server is listening on localhost:${PORT}`);
});
