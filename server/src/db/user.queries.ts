import { User } from "@prisma/client";
import { prisma } from "./prismaClient";

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
  const user = await prisma.user.create({ data: body });
  return user;
};

export const getProfile = async (id: string) => {
  const profile = await prisma.profile.findUnique({
    where: { userId: id },
    include: { user: true },
  });
  return profile;
};
