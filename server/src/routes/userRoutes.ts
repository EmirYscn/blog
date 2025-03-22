import { Router } from "express";
import * as userController from "../controllers/userController";
import { requireAuth, restrictTo } from "../controllers/authController";

const router = Router();

router.get("/", requireAuth, restrictTo("ADMIN"), userController.getUsers);
router.get("/me", requireAuth, userController.getMe);
router.get("/author", userController.getAuthor);

router.get("/profile/:id", userController.getProfile);
router.route("/:id").get(userController.getUser);

export { router };
