import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import * as commentQueries from "../db/comment.queries";
import { User } from "@prisma/client";

export const createComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    const { id: authorId } = req.user as User;
    const { comment, parentCommentId } = req.body;

    await commentQueries.createPostComment(
      postId,
      authorId,
      comment,
      parentCommentId
    );

    res.status(201).json({ status: "success" });
  }
);

export const getPostComments = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    const comments = await commentQueries.getPostComments(postId);

    res.status(201).json({ status: "success", comments });
  }
);

export const deleteComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await commentQueries.deleteComment(id);
    res.status(201).json({ status: "success" });
  }
);
