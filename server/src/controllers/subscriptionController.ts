import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import * as subscriptionQueries from "../db/subscription.queries";
import { Post } from "@prisma/client";
import AppError from "../utils/appError";

export const subscribe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!email) {
      throw new AppError("Email is required", 400);
    }
    await new Promise((resolve) => setTimeout(resolve, 3000));

    await subscriptionQueries.subscribe(email);

    res
      .status(200)
      .json({ status: "success", message: "Subscription successful!" });
  }
);
