import { Router } from "express";

import * as userController from "../controllers/userController";
import { requireAuth, restrictTo } from "../controllers/authController";

import {
  validatePasswordUpdate,
  validateProfileUpdate,
} from "../middlewares/validate";

const router = Router();

router.get("/", requireAuth, restrictTo("ADMIN"), userController.getUsers);
router.get("/me", requireAuth, userController.getMe);
router.get("/author", userController.getAuthor);

router.get("/profile/:id", userController.getProfile);

router.post("/forgotPassword", userController.requestPasswordReset);
router.patch("/resetPassword/:token", userController.resetPassword);

router.patch(
  "/updateProfile",
  requireAuth,
  validateProfileUpdate,
  userController.updateProfile
);
router.patch(
  "/updatePassword",
  requireAuth,
  validatePasswordUpdate,
  userController.updatePassword
);
router.get("/:id", userController.getUser);

export { router };
