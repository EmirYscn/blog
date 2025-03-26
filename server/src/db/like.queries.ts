import AppError from "../utils/appError";
import { prisma } from "./prismaClient";

export const likePost = async (postId: string, userId: string) => {
  const liked = await prisma.like.findUnique({
    where: { userId_postId: { userId, postId } },
  });
  if (liked) {
    await prisma.like.delete({
      where: { id: liked.id },
    });
  } else {
    await prisma.like.create({
      data: {
        userId,
        postId,
      },
    });
  }
};

export const likeComment = async (commentId: string, userId: string) => {
  const liked = await prisma.like.findUnique({
    where: { userId_commentId: { userId, commentId } },
  });
  if (liked) {
    await prisma.like.delete({
      where: { id: liked.id },
    });
  } else {
    await prisma.like.create({
      data: {
        userId,
        commentId,
      },
    });
  }
};
