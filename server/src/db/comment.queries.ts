import { prisma } from "./prismaClient";

export const getPostComments = async (postId: string) => {
  const comments = await prisma.comment.findMany({
    where: { postId, parentId: null },
    include: {
      author: { omit: { password: true } },
      replies: {
        select: {
          id: true,
          content: true,
          author: { omit: { password: true } },
          createdAt: true,
          _count: {
            select: {
              likes: true,
              replies: true, // Count the number of replies to each reply
            },
          },
        },
      },
      _count: {
        select: {
          likes: true,
          replies: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return comments;
};

export const createPostComment = async (
  postId: string,
  authorId: string,
  comment: string
) => {
  const comments = await prisma.comment.create({
    data: {
      postId,
      authorId,
      content: comment,
    },
  });

  return comments;
};

export const deleteComment = async (id: string) => {
  await prisma.comment.delete({ where: { id } });
};
