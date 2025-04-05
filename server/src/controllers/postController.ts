import { NextFunction, Request, Response } from "express";
import { Post, User } from "@prisma/client";

import catchAsync from "../utils/catchAsync";

import * as postQueries from "../db/post.queries";
import * as likeQueries from "../db/like.queries";

export const getAuthorPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const queryFields = {
      search: (req.query.search as string) ?? "",
      tag: (req.query.tag as string) ?? "",
      page: Number(req.query.page) || 1,
      pageSize: Number(req.query.pageSize) || 10,
      published: (req.query.published as string) ?? "",
      featured: (req.query.featured as string) ?? "",
    };

    const { posts, count } = await postQueries.getAuthorPosts(queryFields);

    res.status(200).json({ status: "success", posts, count });
  }
);

export const getUserPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const queryFields = {
      search: (req.query.search as string) ?? "",
      tag: (req.query.tag as string) ?? "",
      page: Number(req.query.page) || 1,
      pageSize: Number(req.query.pageSize) || 10,
      published: (req.query.published as string) ?? "",
      featured: (req.query.featured as string) ?? "",
    };

    const { posts, count } = await postQueries.getUserPosts(id, queryFields);

    res.status(200).json({ status: "success", posts, count });
  }
);

export const getPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await postQueries.getPosts();

    res.status(200).json({ status: "success", posts });
  }
);

export const getPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const post = await postQueries.getPost(id);

    res.status(200).json({ status: "success", post });
  }
);

export const createPost = catchAsync(
  async (req: Request<{}, {}, Post, {}>, res: Response, next: NextFunction) => {
    const { id: userId } = req.user as User;

    const post = await postQueries.createPost(req.body, userId);

    res.status(201).json({ status: "success", post });
  }
);

export const like = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: postId } = req.params;
    const { id: userId } = req.user as User;

    console.log("postId: ", postId, "userId: ", userId);
    await likeQueries.likePost(postId, userId);

    res.status(200).json({ status: "success", message: "Like successful!" });
  }
);

export const updatePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: postId } = req.params;

    await postQueries.updatePost(postId, req.body);

    res.status(200).json({ status: "success", message: "Update successful!" });
  }
);

export const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: postId } = req.params;

    await postQueries.deletePost(postId);

    res.status(200).json({
      status: "success",
      message: `Post with ID: ${postId} deleted successfully!`,
    });
  }
);
