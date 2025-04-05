import { ROLE, User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

import * as userQueries from "../db/user.queries";

import passport, { generateToken } from "../strategies/passport";

export const getCurrentUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // The user is already attached to req by the requireAuth middleware
  // Just return the user data from req.user
  try {
    if (!req.user) {
      res.status(401).json({
        status: "fail",
        message: "No authenticated user found",
      });
      return;
    }

    const user = req.user as User;

    res.status(200).json({
      status: "success",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        role: user.role,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(403).json({
        body: { ...req.body, password: null },
        error: result.array(),
      });
    }

    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = { ...req.body, password: hashedPassword };

    const newUser = await userQueries.createUser(user);

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  }
);

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "local",
    { session: false },
    (err: Error | null, user: User | false, info: { message: string }) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      if (!user) {
        return next(new AppError("Invalid email or password", 401));
      }
      // Generate a JWT token
      const token = generateToken(user);

      // Simply return the token and user info
      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          avatar: user.avatar,
          role: user.role,
        },
      });
    }
  )(req, res, next);
};

// Middleware to protect routes with JWT authentication
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: any, user: any, info: any) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).json({
          message: "Unauthorized",
          details: info ? info.message : "JWT authentication failed",
        });
      }

      req.user = user;
      return next();
    }
  )(req, res, next);
};

export const restrictTo = (...roles: ROLE[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as User;

    if (!roles.includes(user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};
