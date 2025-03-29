import { Post } from "@prisma/client";
import { prisma } from "./prismaClient";
import AppError from "../utils/appError";

export const getAuthorPosts = async (queryFields: {
  search: string;
  tag: string;
  page: number;
  pageSize: number;
  published: string;
  featured: string;
}) => {
  const {
    search = "",
    tag = "all",
    page = 1,
    pageSize = 10,
    published = "",
    featured = "",
  } = queryFields;

  // Create where clause
  const where: any = {
    author: { email: process.env.AUTHOR_EMAIL ?? "" },
    deletedAt: null,
  };

  // Only add search filter if there's a search term
  if (search) {
    where.title = { contains: search, mode: "insensitive" };
  }

  // Only add tag filter if it's not 'all'
  if (tag && tag !== "all") {
    where.tags = { has: tag };
  }

  if (published) {
    where.published = published === "true" ? true : false;
  }

  if (featured) {
    where.featured = featured === "true" ? true : false;
  }

  // Get total count for pagination
  const totalCount = await prisma.post.count({ where });

  // Calculate proper skip value (page numbers typically start at 1)
  const skip = (page - 1) * pageSize;

  const posts = await prisma.post.findMany({
    where,
    include: {
      author: true,
      likes: { select: { userId: true } },
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
    skip,
    take: pageSize,
    orderBy: {
      createdAt: "desc", // Most recent posts first
    },
  });

  return { posts, count: totalCount };
};

export const getPosts = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
      comments: { include: { author: true } },
      likes: true,
      media: true,
    },
  });
  return posts;
};

export const getPost = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: true,
      comments: { include: { author: true } },
      likes: true,
      media: true,
    },
  });

  if (!post) {
    throw new AppError("Post not found", 404);
  }

  return post;
};

export const createPost = async (postData: Post, authorId: string) => {
  const post = await prisma.post.create({
    data: {
      ...postData,
      authorId,
    },
  });
  return post;
};

export const updatePost = async (id: string, body: Post) => {
  const post = await prisma.post.update({
    where: { id },
    data: body,
  });
  return post;
};

export const deletePost = async (id: string) => {
  await prisma.post.delete({
    where: { id },
  });
};
