import axios from "axios";
import { Post } from "../types/types";
import { PAGE_SIZE } from "../utils/constants";
import { api } from "./apiAuth";

type query = {
  search: string;
  tag: string;
  page: number;
};

export const getFeaturedPosts = async ({
  search = "",
  tag = "all",
  page = 1,
}: query): Promise<{
  posts: Post[];
  count: number;
}> => {
  const queryParams = new URLSearchParams();
  if (search) queryParams.append("search", search);
  if (tag && tag !== "all") queryParams.append("tag", tag);

  queryParams.append("page", String(page));
  queryParams.append("pageSize", String(PAGE_SIZE));
  queryParams.append("featured", "true");

  const url = `/api/v1/posts/author?${queryParams.toString()}`;

  try {
    const res = await api.get(url);
    return { posts: res.data.posts, count: res.data.count };
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't fetch featured posts");
  }
};

export const getPublishedPosts = async ({
  search = "",
  tag = "all",
  page = 1,
}: query): Promise<{
  posts: Post[];
  count: number;
}> => {
  const queryParams = new URLSearchParams();
  if (search) queryParams.append("search", search);
  if (tag && tag !== "all") queryParams.append("tag", tag);

  queryParams.append("page", String(page));
  queryParams.append("pageSize", String(PAGE_SIZE));
  queryParams.append("published", "true");

  const url = `/api/v1/posts/author?${queryParams.toString()}`;
  try {
    const res = await api.get(url);
    return { posts: res.data.posts, count: res.data.count };
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't fetch published posts");
  }
};

export const getUnpublishedPosts = async ({
  search = "",
  tag = "all",
  page = 1,
}: query): Promise<{
  posts: Post[];
  count: number;
}> => {
  const queryParams = new URLSearchParams();
  if (search) queryParams.append("search", search);
  if (tag && tag !== "all") queryParams.append("tag", tag);

  queryParams.append("page", String(page));
  queryParams.append("pageSize", String(PAGE_SIZE));
  queryParams.append("published", "false");

  const url = `/api/v1/posts/author?${queryParams.toString()}`;
  try {
    const res = await api.get(url);
    return { posts: res.data.posts, count: res.data.count };
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't fetch unpublished posts");
  }
};

export const getAuthorPosts = async ({
  search = "",
  tag = "all",
  page = 1,
}: query): Promise<{ posts: Post[]; count: number }> => {
  const queryParams = new URLSearchParams();
  if (search) queryParams.append("search", search);
  if (tag && tag !== "all") queryParams.append("tag", tag);

  queryParams.append("page", String(page));
  queryParams.append("pageSize", String(PAGE_SIZE));
  const url = `/api/v1/posts/author?${queryParams.toString()}`;

  try {
    const res = await api.get(url);
    console.log(res.data.posts);
    return { posts: res.data.posts, count: res.data.count };
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't fetch posts");
  }
};

export const getPosts = async (): Promise<Post[]> => {
  try {
    const res = await api.get("/api/v1/posts");
    return res.data.posts; // Axios automatically parses JSON
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't fetch posts");
  }
};

export const getPost = async (postId: string): Promise<Post> => {
  try {
    const res = await api.get(`/api/v1/posts/${postId}`);
    console.log(res);
    return res.data.post;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't fetch post");
  }
};

export const updatePost = async (postId: string, body: Partial<Post>) => {
  try {
    await api.patch(`/api/v1/posts/${postId}`, body);
  } catch (error) {
    console.error("Like error:", error);
    // Extract error message from response
    if (axios.isAxiosError(error)) {
      const serverMessage =
        error.response?.data?.message || "Couldn't update post";
      throw new Error(serverMessage);
    }

    throw new Error("An unexpected error occurred.");
  }
};
