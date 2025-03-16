import express, { Application, NextFunction, Request, Response } from "express";

import dotenv from "dotenv";
import path from "node:path";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import morgan from "morgan";

import { router as userRouter } from "./routes/userRoutes";
import { router as postRouter } from "./routes/postRoutes";
import { router as commentRouter } from "./routes/commentRoutes";
import { router as authRouter } from "./routes/authRoutes";

import AppError from "./utils/appError";
import { globalErrorHandler } from "./controllers/errorController";

dotenv.config({ path: "./.env" });

const app: Application = express();

// Enable trust proxy (for HTTPS & real IP detection)
// app.enable("trust proxy");

// Implement CORS
const corsOptions = {
  origin:
    process.env.NODE_ENV === "development" ? "*" : "https://yourdomain.com",
  credentials: true, // Allow cookies & auth headers
};

app.use(cors(corsOptions));

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many requests from this IP, please try again in an hour!",
// });
// app.use("/api", limiter);

// app middleware to use form body in post router
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);

// Handle undefined routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

// Handle unexpected crashes
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! Shutting down...");
  console.error(err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED PROMISE REJECTION! Shutting down...");
  console.error(err);
  server.close(() => process.exit(1));
});
