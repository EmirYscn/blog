import { Router } from "express";
import * as userController from "../controllers/userController";

const router = Router();

router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);

export { router };
