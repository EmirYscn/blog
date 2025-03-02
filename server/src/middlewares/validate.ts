import { body } from "express-validator";
import * as db from "../db/user.queries";
import bcrypt from "bcryptjs";

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

// body("confirmPassword").custom((value, { req }) => {
//   if (value !== req.body.password) {
//     throw new Error("Passwords do not match");
//   }
//   return true;
// }),
