import { Router } from "express";

import * as postController from "../controllers/postController";
import { requireAuth } from "../controllers/authController";

const router = Router();

router.get("/", postController.getPosts);
router.post("/", requireAuth, postController.createPost);
router.get("/author", postController.getAuthorPosts);
router.get("/user/:id", postController.getUserPosts);

router.get("/:id", postController.getPost);
router.patch("/:id", requireAuth, postController.updatePost);
router.delete("/:id", requireAuth, postController.deletePost);
router.post("/:id/like", requireAuth, postController.like);

export { router };
