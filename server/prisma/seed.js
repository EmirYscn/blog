import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create 5 users
  const users = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.user.create({
        data: {
          email: faker.internet.email(),
          username: faker.internet.userName(),
          password: faker.internet.password(),
          avatar: faker.image.avatar(),
          profile: {
            create: { bio: faker.lorem.sentence() },
          },
        },
      })
    )
  );

  // Create 5 posts, each with at least 1 comment
  await Promise.all(
    users.map(async (user) => {
      const post = await prisma.post.create({
        data: {
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(2),
          published: faker.datatype.boolean(),
          authorId: user.id,
        },
      });

      // Add a comment to the post
      await prisma.comment.create({
        data: {
          content: faker.lorem.sentence(),
          postId: post.id,
          authorId: user.id,
        },
      });
    })
  );

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
