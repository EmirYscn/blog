import axios from "axios";
import { api } from "./apiAuth";

export const likePost = async (postId: string) => {
  try {
    await api.post(`/api/v1/posts/${postId}/like`);
  } catch (error: unknown) {
    // Extract error message from response
    if (axios.isAxiosError(error)) {
      const serverMessage =
        error.response?.data?.message || "Couldn't like post";
      throw new Error(serverMessage);
    }

    throw new Error("An unexpected error occurred.");
  }
};

export const likeComment = async (commentId: string) => {
  try {
    await api.post(`/api/v1/comments/${commentId}/like`);
  } catch (error: unknown) {
    // Extract error message from response
    if (axios.isAxiosError(error)) {
      const serverMessage =
        error.response?.data?.message || "Couldn't like comment";
      throw new Error(serverMessage);
    }

    throw new Error("An unexpected error occurred.");
  }
};
