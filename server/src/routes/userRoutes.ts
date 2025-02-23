import { Router } from "express";
import { prisma } from "../db/prismaClient";

const router = Router();

router.get("/", async (req, res) => {
  const users = await prisma.user.findMany({});
  res.status(200).json(users);
});

export { router };
