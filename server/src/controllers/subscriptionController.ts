import { NextFunction, Request, Response } from "express";

import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

import * as subscriptionQueries from "../db/subscription.queries";

export const subscribe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!email) {
      throw new AppError("Email is required", 400);
    }

    await subscriptionQueries.subscribe(email);

    res
      .status(200)
      .json({ status: "success", message: "Subscription successful!" });
  }
);
