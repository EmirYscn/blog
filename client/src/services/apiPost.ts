import { PostType } from "../types/types";
import { api } from "./apiAuth";

export const getPosts = async (): Promise<PostType[]> => {
  try {
    const res = await api.get("/api/v1/posts");
    console.log(res);
    return res.data.posts; // Axios automatically parses JSON
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't fetch posts");
  }
};
