import { NextFunction, Request, Response } from "express";
import * as userQueries from "../db/user.queries";

import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { User } from "@prisma/client";

export const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user as User;
    const user = await userQueries.getUser(id);

    res.status(200).json({ status: "success", data: { user } });
  }
);

export const getUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userQueries.getUsers();

    res.status(200).json({ status: "success", data: { users } });
  }
);

export const getAuthor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const author = await userQueries.getAuthor();

    res.status(200).json({ status: "success", author });
  }
);

export const getProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const profile = await userQueries.getProfile(id);

    if (!profile) {
      return next(new AppError(`Profile with ID ${id} not found`, 404));
    }

    res.status(200).json({ status: "success", profile });
  }
);

export const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const user = await userQueries.getUser(id);

    if (!user) {
      return next(new AppError(`User with ID ${id} not found`, 404));
    }

    res.status(200).json({ status: "success", data: { user } });
  }
);
