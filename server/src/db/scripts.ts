import { prisma } from "./prismaClient";

async function main() {
  // await prisma.post.deleteMany({});
  // await prisma.user.deleteMany({});
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
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, laborum!",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "656c62e3-140d-4e1f-a66d-0e53760e66fb",
        tags: ["databases"],
      },
      {
        title:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, harum.",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, laborum!",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "656c62e3-140d-4e1f-a66d-0e53760e66fb",
        tags: ["system-design"],
      },
      {
        title:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, harum?",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, laborum!",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "656c62e3-140d-4e1f-a66d-0e53760e66fb",
      },
      {
        title:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, harum.",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, laborum!",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "656c62e3-140d-4e1f-a66d-0e53760e66fb",
        featured: true,
      },
      {
        title:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, harum.",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, laborum!,Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis hic dicta, culpa reprehenderit reiciendis voluptates optio tenetur iure nostrum rem quaerat quasi delectus dolores tempora laudantium facere autem ea aliquam?",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "656c62e3-140d-4e1f-a66d-0e53760e66fb",
      },
      {
        title:
          "Lorem, ipsum do you see sit amet consectetur adipisicing elit. Dolor, harum.",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, laborum!,Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis hic dicta, culpa reprehenderit reiciendis voluptates optio tenetur iure nostrum rem quaerat quasi delectus dolores tempora laudantium facere autem ea aliquam?",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "656c62e3-140d-4e1f-a66d-0e53760e66fb",
      },
      {
        title:
          "Lorem, ipsum isloading sit amet consectetur adipisicing elit. Dolor, harum.",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, laborum!,Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis hic dicta, culpa reprehenderit reiciendis voluptates optio tenetur iure nostrum rem quaerat quasi delectus dolores tempora laudantium facere autem ea aliquam?",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "656c62e3-140d-4e1f-a66d-0e53760e66fb",
        featured: true,
      },
      {
        title:
          "Lorem, ipsum youth sit amet consectetur adipisicing elit. Dolor, harum.",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, laborum!,Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis hic dicta, culpa reprehenderit reiciendis voluptates optio tenetur iure nostrum rem quaerat quasi delectus dolores tempora laudantium facere autem ea aliquam?",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "656c62e3-140d-4e1f-a66d-0e53760e66fb",
        tags: ["api-design", "databases"],
      },
      {
        title:
          "Lorem, ipsum onmyway sit amet consectetur adipisicing elit. Dolor, harum.",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "656c62e3-140d-4e1f-a66d-0e53760e66fb",
      },
      {
        title:
          "Lorem, ipsum yousee sit amet consectetur adipisicing elit. Dolor, harum.",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "656c62e3-140d-4e1f-a66d-0e53760e66fb",
        featured: true,
      },
      {
        title:
          "Lorem, ipsum manymore sit amet consectetur adipisicing elit. Dolor, harum.",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "656c62e3-140d-4e1f-a66d-0e53760e66fb",
      },
      {
        title:
          "Lorem, ipsum design sit amet consectetur adipisicing elit. Dolor, harum.",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "656c62e3-140d-4e1f-a66d-0e53760e66fb",
      },
      {
        title:
          "Lorem, ipsum server sit amet consectetur adipisicing elit. Dolor, harum.",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "656c62e3-140d-4e1f-a66d-0e53760e66fb",
        tags: ["api-design", "databases"],
      },
      {
        title:
          "Lorem, ipsum client sit amet consectetur adipisicing elit. Dolor, harum.",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "656c62e3-140d-4e1f-a66d-0e53760e66fb",
        tags: ["system-design", "databases"],
        featured: true,
      },
      {
        title:
          "Lorem, ipsum database sit amet consectetur adipisicing elit. Dolor, harum.",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "656c62e3-140d-4e1f-a66d-0e53760e66fb",
        tags: ["api-design", "design-patterns"],
      },
      {
        title:
          "Lorem, ipsum emir sit amet consectetur adipisicing elit. Dolor, harum.",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A amet neque ratione corrupti exercitationem rerum suscipit quia aut, repellat doloremque nulla unde eligendi omnis deserunt quis doloribus animi ipsam voluptatem?",
        authorId: "656c62e3-140d-4e1f-a66d-0e53760e66fb",
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
