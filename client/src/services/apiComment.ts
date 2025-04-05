import axios from "axios";
import { api } from "./apiAuth";
import { Comment } from "../types/types";

export const getPostComments = async (postId: string): Promise<Comment[]> => {
  try {
    const res = await api.get(`/api/v1/comments/post/${postId}`);
    return res.data.comments;
  } catch (error: unknown) {
    // Extract error message from response
    if (axios.isAxiosError(error)) {
      const serverMessage =
        error.response?.data?.message || "Couldn't fetch comments";
      throw new Error(serverMessage);
    }

    throw new Error("An unexpected error occurred.");
  }
};

export const createComment = async (
  postId: string,
  comment: string,
  parentCommentId: string | null = null
) => {
  try {
    await api.post(`/api/v1/comments/post/${postId}`, {
      comment,
      parentCommentId,
    });
  } catch (error: unknown) {
    // Extract error message from response
    if (axios.isAxiosError(error)) {
      const serverMessage = error.response?.data?.message || "Couldn't comment";
      throw new Error(serverMessage);
    }

    throw new Error("An unexpected error occurred.");
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    await api.delete(`/api/v1/comments/${commentId}`);
  } catch (error: unknown) {
    // Extract error message from response
    if (axios.isAxiosError(error)) {
      const serverMessage =
        error.response?.data?.message || "Couldn't delete comment";
      throw new Error(serverMessage);
    }

    throw new Error("An unexpected error occurred.");
  }
};
