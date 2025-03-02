import { Router } from "express";
import * as userController from "../controllers/userController";
import { requireAuth } from "../controllers/authController";

const router = Router();

router.route("/").get(userController.getUsers);
router.get("/me", requireAuth, userController.getMe);
// .post(userController.createUser);

router.route("/:id").get(userController.getUser);

export { router };
