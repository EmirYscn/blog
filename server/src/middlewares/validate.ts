import { body } from "express-validator";
import bcrypt from "bcryptjs";

import * as db from "../db/user.queries";

export const validateSignup = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .custom(async (value) => {
      const user = await db.findUserByEmail(value);
      if (user) {
        throw new Error("Email already in use");
      }
    }),
  body("username")
    .notEmpty()
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("Username can not be less than 2 and more than 30 characters"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password can not be less than 8 characters"),
];

export const validateProfileUpdate = [
  body("email")
    .optional()
    .isEmail()
    .withMessage("Please enter a valid email address")
    .custom(async (value) => {
      const user = await db.findUserByEmail(value);
      if (user) {
        throw new Error("Email already in use");
      }
    }),
  body("username")
    .optional()
    .notEmpty()
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("Username can not be less than 2 and more than 30 characters"),
  body("bio")
    .optional()
    .isLength({ max: 160 })
    .withMessage("Bio can not be more than 160 characters"),
];

export const validatePasswordUpdate = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required")
    .custom(async (value, { req }) => {
      const user = await db.findUserById(req.user.id);
      if (!user) {
        throw new Error("User not found");
      }
      // If the user has no password, allow password creation without checking currentPassword
      if (!user.password) {
        return true; // Skip validation
      }

      const isMatch = await bcrypt.compare(value, user.password!);
      if (!isMatch) {
        throw new Error("Current password is incorrect");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 8 })
    .withMessage("New password can not be less than 8 characters"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];
