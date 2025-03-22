import { Post } from "@prisma/client";
import { prisma } from "./prismaClient";
import AppError from "../utils/appError";

export const getFeaturedAuthorPosts = async () => {
  const posts = await prisma.post.findMany({
    where: {
      author: { email: process.env.AUTHOR_EMAIL ?? "" },
      featured: true,
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      updatedAt: true,
      published: true,
      media: true,
      tags: true,
      content: true,
      authorId: true,
      // Get counts
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc", // Most recent posts first
    },
  });

  return posts;
};

export const getAuthorPosts = async (queryFields: {
  search: string;
  tag: string;
  page: number;
  pageSize: number;
}) => {
  const { search = "", tag = "all", page = 1, pageSize = 10 } = queryFields;

  // Create where clause
  const where: any = {
    author: { email: process.env.AUTHOR_EMAIL ?? "" },
  };

  // Only add search filter if there's a search term
  if (search) {
    where.title = { contains: search, mode: "insensitive" };
  }

  // Only add tag filter if it's not 'all'
  if (tag && tag !== "all") {
    where.tags = { has: tag };
  }

  // Get total count for pagination
  const totalCount = await prisma.post.count({ where });

  // Calculate proper skip value (page numbers typically start at 1)
  const skip = (page - 1) * pageSize;

  const posts = await prisma.post.findMany({
    where,
    select: {
      id: true,
      title: true,
      createdAt: true,
      updatedAt: true,
      published: true,
      media: true,
      tags: true,
      content: true,
      authorId: true,
      // Get counts
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

export const createPost = async (body: Post) => {
  const post = await prisma.post.create({
    data: body,
  });
  return post;
};

// export const getPostComments = async (postId: string) => {
//   const comments = await prisma.comment.findMany({
//     where: { postId },
//   });

//   return comments;
// };

// export const createPostComment = async (
//   postId: string,
//   authorId: string,
//   comment: string
// ) => {
//   const comments = await prisma.comment.create({
//     data: {
//       postId,
//       authorId,
//       content: comment,
//     },
//   });

//   return comments;
// };
