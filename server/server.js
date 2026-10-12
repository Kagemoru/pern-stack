import express from "express";
import "dotenv/config";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { testDbConnection, CloseDbConnection } from "./src/config/pooldb.js";
import { testNodeMailConnection, CloseNodeMailConnection } from "./src/config/nodemailer.js";
import authRoutes from "./src/routes/auth.route.js";
import { apiLimiter } from "./src/middleware/rateLimiter.js";


const PORT = process.env.PORT;
const app = express();

// Middleware
app.use(helmet());
app.use(cookieParser());
app.use(apiLimiter);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: `Server is running on localhost:${PORT}` });
});

const server = app.listen(PORT, async () => {
  await testDbConnection();
  await testNodeMailConnection();
  console.log(`Server is listening on localhost:${PORT}`);
});

let shuttingDown = false;

async function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;

  console.log(`Received ${signal}, shutting down gracefully...`);

  try {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });

    await CloseDbConnection();
    await CloseNodeMailConnection();

    console.log("Graceful shutdown complete.");
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exitCode = 1;
    process.exit(1);
  }
}

process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));