import { Prisma, User } from "@prisma/client";
import { prisma } from "./prismaClient";
import AppError from "../utils/appError";

export const getAuthor = async () => {
  const user = await prisma.user.findUnique({
    where: { email: process.env.AUTHOR_EMAIL },
  });

  return user;
};

export const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
};

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  return user;
};

export const findUserById = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  return user;
};

export const createUser = async (body: User) => {
  return await prisma.$transaction(async (prisma) => {
    const user = await prisma.user.create({ data: body });
    await prisma.profile.create({
      data: {
        userId: user.id,
      },
    });

    return user;
  });
};

export const getProfile = async (id: string) => {
  const profile = await prisma.profile.findUnique({
    where: { userId: id },
    include: {
      user: {
        select: {
          avatar: true,
          email: true,
          id: true,
          role: true,
          username: true,
          posts: true,
        },
      },
    },
  });
  return profile;
};
