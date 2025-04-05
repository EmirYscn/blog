import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

import AppError from "../utils/appError";

// const handleCastErrorDB = (err) => {
//   const message = `Invalid ${err.path}: ${err.value}.`;
//   return new AppError(message, 400);
// };

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401);

const handleValidationError = (err: Error) =>
  new AppError("Validation Error", 401);

const sendErrorDev = (err: AppError, req: Request, res: Response) => {
  // A) API
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};

const sendErrorProd = (err: AppError, req: Request, res: Response) => {
  // A) API
  if (req.originalUrl.startsWith("/api")) {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error("ERROR 💥", err);
    // 2) Send generic message
    return res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    // Prisma Errors Handling
    if (err instanceof PrismaClientValidationError)
      error = handleValidationError(error);

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      switch (err.code) {
        case "P2002":
          error = new AppError(
            "Duplicate entry. This value must be unique.",
            400
          );
          break;
        case "P2003":
          error = new AppError("Foreign key constraint failed.", 400);
          break;
        case "P2025":
          error = new AppError("Record not found.", 404);
          break;
        case "P2014":
          error = new AppError("Violation of required relation.", 400);
          break;
        case "P2018":
          error = new AppError("Required connected record not found.", 400);
          break;
        case "P2024":
        case "P1017":
          error = new AppError("Database connection error.", 500);
          break;
        default:
          error = new AppError("Database operation failed.", 500);
      }
    }

    // if (error.name === "CastError") error = handleCastErrorDB(error);
    // if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    // if (error.name === "ValidationError")
    //   error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    // if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};
