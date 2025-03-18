import { Router } from "express";
import * as userController from "../controllers/userController";
import { requireAuth } from "../controllers/authController";

const router = Router();

router.route("/").get(userController.getUsers);
router.get("/me", requireAuth, userController.getMe);
router.get("/author", userController.getAuthor);
router.get("/profile/:id", userController.getProfile);

// .post(userController.createUser);

router.route("/:id").get(userController.getUser);

export { router };
