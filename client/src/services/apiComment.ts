import axios from "axios";
import { api } from "./apiAuth";
import { Comment } from "../types/types";

export const getPostComments = async (postId: string): Promise<Comment[]> => {
  try {
    const res = await api.get(`/api/v1/comments/post/${postId}`);
    return res.data.comments;
  } catch (error) {
    console.error("Comment error:", error);
    // Extract error message from response
    if (axios.isAxiosError(error)) {
      const serverMessage =
        error.response?.data?.message || "Couldn't fetch comments";
      throw new Error(serverMessage);
    }

    throw new Error("An unexpected error occurred.");
  }
};

export const createComment = async (postId: string, comment: string) => {
  try {
    await api.post(`/api/v1/comments/post/${postId}`, { comment });
  } catch (error) {
    console.error("Comment error:", error);
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
  } catch (error) {
    console.error("Comment deletion error:", error);
    // Extract error message from response
    if (axios.isAxiosError(error)) {
      const serverMessage =
        error.response?.data?.message || "Couldn't delete comment";
      throw new Error(serverMessage);
    }

    throw new Error("An unexpected error occurred.");
  }
};
