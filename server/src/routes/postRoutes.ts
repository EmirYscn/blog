import { Router } from "express";
import * as postController from "../controllers/postController";

const router = Router();

router.get("/", postController.getPosts);
// router.get("/:id", userController.getUser);

export { router };
