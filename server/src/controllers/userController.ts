import { NextFunction, Request, Response } from "express";
import { prisma } from "../db/prismaClient";
import * as userQueries from "../db/user.queries";

import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

export const getUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userQueries.getUsers();

    res.status(200).json({ status: "success", data: { users } });
  }
);

export const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return next(new AppError("Invalid user ID", 400));
    }

    const user = await userQueries.getUser(+id);

    if (!user) {
      return next(new AppError(`User with ID ${id} not found`, 404));
    }

    res.status(200).json({ status: "success", data: { user } });
  }
);
