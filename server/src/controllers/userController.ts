import { NextFunction, Request, Response } from "express";
import * as userQueries from "../db/user.queries";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { User } from "@prisma/client";
import { validationResult } from "express-validator";
import { Email } from "../utils/email";

const CLIENT_URL = process.env.CLIENT_URL;
const CLIENT_AUTHOR_URL = process.env.CLIENT_AUTHOR_URL;

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

export const updateProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user as User;

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({
        body: { ...req.body },
        error: result.array(),
      });
    }

    await userQueries.updateUser(id, req.body);

    res
      .status(200)
      .json({ status: "success", message: "Profile updated successfully" });
  }
);

export const updatePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user as User;

    const user = await userQueries.findUserById(id);
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    // Validate current password if user has one
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({
        body: { ...req.body, password: null },
        error: result.array(),
      });
    }

    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = { password: hashedPassword };

    await userQueries.updateUser(id, data);

    res
      .status(200)
      .json({ status: "success", message: "Password updated successfully" });
  }
);

export const requestPasswordReset = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const redirect = req.query.redirect || req.headers.referer; // Capture frontend origin
    const allowedRedirects = [CLIENT_URL, CLIENT_AUTHOR_URL];

    // Ensure the redirect is a valid frontend URL
    const safeRedirect = allowedRedirects.includes(redirect?.toString())
      ? redirect
      : CLIENT_URL;

    const user = await userQueries.findUserByEmail(email);
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    // Generate a secure token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Store token in database with expiration (e.g., 1 hour)
    await userQueries.updateUser(user.id, {
      resetPasswordToken: hashedToken,
      resetPasswordExpires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour expiry
    });

    // Send email with reset link
    const resetURL = `${safeRedirect}reset-password?token=${resetToken}`;
    try {
      const emailTransport = new Email(user, resetURL);
      await emailTransport.sendPasswordReset();

      res.status(200).json({
        status: "success",
        message: "Password reset email sent!",
      });
    } catch (err) {
      return next(
        new AppError("Failed to send email. Please try again later.", 500)
      );
    }
  }
);

export const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;
    const { password } = req.body;

    // Hash token to match stored hash
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await userQueries.findUserByResetToken(hashedToken);
    if (!user || user.resetPasswordExpires! < new Date()) {
      return next(new AppError("Invalid or expired token", 400));
    }

    // Hash and update password
    const hashedPassword = await bcrypt.hash(password, 10);
    await userQueries.updateUser(user.id, {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });

    res.status(200).json({
      status: "success",
      message: "Password has been reset successfully!",
    });
  }
);
