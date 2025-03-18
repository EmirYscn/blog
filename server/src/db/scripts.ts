import { prisma } from "./prismaClient";

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

  await prisma.post.createMany({
    data: [
      {
        title:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, harum?",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "211c023e-7c8c-440c-98f1-0430104e7cea",
        tags: ["databases"],
      },
      {
        title:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, harum.",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "211c023e-7c8c-440c-98f1-0430104e7cea",
        tags: ["system-design"],
      },
      {
        title:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, harum?",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "211c023e-7c8c-440c-98f1-0430104e7cea",
      },
      {
        title:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, harum.",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "211c023e-7c8c-440c-98f1-0430104e7cea",
      },
      {
        title:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, harum.",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "211c023e-7c8c-440c-98f1-0430104e7cea",
      },
      {
        title:
          "Lorem, ipsum do you see sit amet consectetur adipisicing elit. Dolor, harum.",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "211c023e-7c8c-440c-98f1-0430104e7cea",
      },
      {
        title:
          "Lorem, ipsum isloading sit amet consectetur adipisicing elit. Dolor, harum.",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "211c023e-7c8c-440c-98f1-0430104e7cea",
      },
      {
        title:
          "Lorem, ipsum youth sit amet consectetur adipisicing elit. Dolor, harum.",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "211c023e-7c8c-440c-98f1-0430104e7cea",
        tags: ["api-design", "databases"],
      },
      {
        title:
          "Lorem, ipsum onmyway sit amet consectetur adipisicing elit. Dolor, harum.",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "211c023e-7c8c-440c-98f1-0430104e7cea",
      },
      {
        title:
          "Lorem, ipsum yousee sit amet consectetur adipisicing elit. Dolor, harum.",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "211c023e-7c8c-440c-98f1-0430104e7cea",
      },
      {
        title:
          "Lorem, ipsum manymore sit amet consectetur adipisicing elit. Dolor, harum.",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "211c023e-7c8c-440c-98f1-0430104e7cea",
      },
      {
        title:
          "Lorem, ipsum design sit amet consectetur adipisicing elit. Dolor, harum.",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "211c023e-7c8c-440c-98f1-0430104e7cea",
      },
      {
        title:
          "Lorem, ipsum server sit amet consectetur adipisicing elit. Dolor, harum.",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "211c023e-7c8c-440c-98f1-0430104e7cea",
        tags: ["api-design", "databases"],
      },
      {
        title:
          "Lorem, ipsum client sit amet consectetur adipisicing elit. Dolor, harum.",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "211c023e-7c8c-440c-98f1-0430104e7cea",
        tags: ["system-design", "databases"],
      },
      {
        title:
          "Lorem, ipsum database sit amet consectetur adipisicing elit. Dolor, harum.",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "211c023e-7c8c-440c-98f1-0430104e7cea",
        tags: ["api-design", "design-patterns"],
      },
      {
        title:
          "Lorem, ipsum emir sit amet consectetur adipisicing elit. Dolor, harum.",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "211c023e-7c8c-440c-98f1-0430104e7cea",
        tags: ["api-design"],
      },
    ],
  });

  //   const users = await prisma.user.findMany();
  //   console.dir(users, { depth: null });
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
