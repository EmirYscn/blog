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
  queryParams.append("published", "true");

  const url = `/api/v1/posts/author?${queryParams.toString()}`;

  try {
    const res = await api.get(url);
    return { posts: res.data.posts, count: res.data.count };
  } catch (error: unknown) {
    throw new Error("Couldn't fetch featured posts");
  }
};

export const getAuthorPosts = async ({
  search = "",
  tag = "all",
  page = 1,
}: {
  search: string;
  tag: string;
  page: number;
}): Promise<{ posts: Post[]; count: number }> => {
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
  } catch (error: unknown) {
    throw new Error("Couldn't fetch posts");
  }
};

export const getUserPosts = async (
  userId: string | undefined,
  { search = "", tag = "all", page = 1 }: query
): Promise<{ posts: Post[]; count: number }> => {
  const queryParams = new URLSearchParams();
  if (search) queryParams.append("search", search);
  if (tag && tag !== "all") queryParams.append("tag", tag);

  queryParams.append("page", String(page));
  queryParams.append("pageSize", String(PAGE_SIZE));

  const url = `/api/v1/posts/user/${userId}/?${queryParams.toString()}`;

  try {
    const res = await api.get(url);
    return { posts: res.data.posts, count: res.data.count };
  } catch (error: unknown) {
    throw new Error("Couldn't fetch posts");
  }
};

export const getPosts = async (): Promise<Post[]> => {
  try {
    const res = await api.get("/api/v1/posts");
    return res.data.posts; // Axios automatically parses JSON
  } catch (error: unknown) {
    throw new Error("Couldn't fetch posts");
  }
};

export const getPost = async (postId: string): Promise<Post> => {
  try {
    const res = await api.get(`/api/v1/posts/${postId}`);

    return res.data.post;
  } catch (error: unknown) {
    throw new Error("Couldn't fetch post");
  }
};
