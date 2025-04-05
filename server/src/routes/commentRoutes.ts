import { Router } from "express";

import * as commentController from "../controllers/commentController";
import { requireAuth } from "../controllers/authController";

const router = Router();

router.delete("/:id", commentController.deleteComment);
router.post("/:id/like", requireAuth, commentController.like);
router.get("/post/:postId", commentController.getPostComments);
router.post("/post/:postId", requireAuth, commentController.createComment);

export { router };
