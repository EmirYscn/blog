import { Router } from "express";
import * as postController from "../controllers/postController";

const router = Router();

router.get("/", postController.getPosts);
router.post("/", postController.createPost);
router.get("/author", postController.getAuthorPosts);
router.get("/author/featured", postController.getFeaturedAuthorPosts);
router.get("/:id", postController.getPost);

export { router };
