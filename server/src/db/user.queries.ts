import { prisma } from "./prismaClient";

export const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const getUser = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
};
