import { prisma } from "./prismaClient";

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
