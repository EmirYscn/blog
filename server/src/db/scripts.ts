import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // await prisma.user.deleteMany();

  // await prisma.user.create({
  //   data: {
  //     email: "emiryscn@hotmail.com",
  //     username: "emir",
  //     password: "21emir21",
  //   },
  // });

  // await prisma.user.findUnique({
  //   where: { id: 3 },
  //   include: {
  //     posts: {select: {}}
  //   }
  // });

  const users = await prisma.user.findMany();
  console.dir(users, { depth: null });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
