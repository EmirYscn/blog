import AppError from "../utils/appError";
import { prisma } from "./prismaClient";

export const subscribe = async (email: string) => {
  // Check if email already exists
  const existingSubscriber = await prisma.subscriber.findUnique({
    where: { email },
  });
  if (existingSubscriber) {
    throw new AppError("Email already subscribed", 400);
  }
  await prisma.subscriber.create({ data: { email } });
};
