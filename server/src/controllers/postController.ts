import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import * as postQueries from "../db/post.queries";

export const getFeaturedAuthorPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await postQueries.getFeaturedAuthorPosts();

    res.status(200).json({ status: "success", posts });
  }
);

export const getAuthorPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const queryFields = {
      search: (req.query.search as string) ?? "",
      tag: (req.query.tag as string) ?? "",
      page: Number(req.query.page) || 1,
      pageSize: Number(req.query.pageSize) || 10,
    };

    const { posts, count } = await postQueries.getAuthorPosts(queryFields);

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
