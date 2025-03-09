import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import * as postQueries from "../db/post.queries";

export const getPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await postQueries.getPosts();

    res.status(200).json({ status: "success", posts });
  }
);
