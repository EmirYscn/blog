import styled from "styled-components";

const posts = [
  {
    id: 1,
    createdAt: new Date("2025-02-01T10:00:00Z"),
    updatedAt: new Date("2025-02-01T10:00:00Z"),
    deletedAt: null,
    title: "Introduction to React",
    content:
      "This is a post about the basics of React and how to get started with it.",
    published: true,
    authorId: 1,
    comments: [],
    tags: ["React", "JavaScript", "Frontend"],
    media: [],
  },
  {
    id: 2,
    createdAt: new Date("2025-02-02T14:30:00Z"),
    updatedAt: new Date("2025-02-02T14:30:00Z"),
    deletedAt: null,
    title: "Understanding Prisma with PostgreSQL",
    content:
      "In this post, we dive deep into using Prisma with PostgreSQL for efficient data handling.",
    published: true,
    authorId: 2,
    comments: [],
    tags: ["Prisma", "PostgreSQL", "Backend"],
    media: [],
  },
  {
    id: 3,
    createdAt: new Date("2025-02-05T09:15:00Z"),
    updatedAt: new Date("2025-02-05T09:15:00Z"),
    deletedAt: null,
    title: "Advanced CSS Techniques",
    content:
      "Explore advanced CSS techniques to create beautiful, responsive layouts.",
    published: false,
    authorId: 3,
    comments: [],
    tags: ["CSS", "Design", "Web Development"],
    media: [],
  },
  {
    id: 4,
    createdAt: new Date("2025-02-10T12:00:00Z"),
    updatedAt: new Date("2025-02-10T12:00:00Z"),
    deletedAt: null,
    title: "Understanding GraphQL",
    content:
      "A deep dive into GraphQL, covering queries, mutations, and subscriptions.",
    published: true,
    authorId: 4,
    comments: [],
    tags: ["GraphQL", "API", "Backend"],
    media: [],
  },
  {
    id: 5,
    createdAt: new Date("2025-02-15T16:45:00Z"),
    updatedAt: new Date("2025-02-15T16:45:00Z"),
    deletedAt: null,
    title: "Building a Blog with Next.js",
    content:
      "Learn how to create a fast, SEO-friendly blog with Next.js and React.",
    published: true,
    authorId: 5,
    comments: [],
    tags: ["Next.js", "React", "Blogging"],
    media: [],
  },
  {
    id: 6,
    createdAt: new Date("2025-02-15T16:45:00Z"),
    updatedAt: new Date("2025-02-15T16:45:00Z"),
    deletedAt: null,
    title: "Building a Blog with Next.js",
    content:
      "Learn how to create a fast, SEO-friendly blog with Next.js and React.",
    published: true,
    authorId: 5,
    comments: [],
    tags: ["Next.js", "React", "Blogging"],
    media: [],
  },
  {
    id: 7,
    createdAt: new Date("2025-02-15T16:45:00Z"),
    updatedAt: new Date("2025-02-15T16:45:00Z"),
    deletedAt: null,
    title: "Building a Blog with Next.js",
    content:
      "Learn how to create a fast, SEO-friendly blog with Next.js and React.",
    published: true,
    authorId: 5,
    comments: [],
    tags: ["Next.js", "React", "Blogging"],
    media: [],
  },
  {
    id: 8,
    createdAt: new Date("2025-02-15T16:45:00Z"),
    updatedAt: new Date("2025-02-15T16:45:00Z"),
    deletedAt: null,
    title: "Building a Blog with Next.js",
    content:
      "Learn how to create a fast, SEO-friendly blog with Next.js and React.",
    published: true,
    authorId: 5,
    comments: [],
    tags: ["Next.js", "React", "Blogging"],
    media: [],
  },
  {
    id: 9,
    createdAt: new Date("2025-02-15T16:45:00Z"),
    updatedAt: new Date("2025-02-15T16:45:00Z"),
    deletedAt: null,
    title: "Building a Blog with Next.js",
    content:
      "Learn how to create a fast, SEO-friendly blog with Next.js and React.",
    published: true,
    authorId: 5,
    comments: [],
    tags: ["Next.js", "React", "Blogging"],
    media: [],
  },
];

const StyledPosts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const PostCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  padding: 2rem;
`;

function Posts() {
  return (
    <StyledPosts>
      {posts.map((post) => (
        <PostCard key={post.id}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>{post.title}</h3>
            <span>{post.createdAt.toDateString()}</span>
          </div>
          <div>
            <p>{post.content}</p>
          </div>
        </PostCard>
      ))}
    </StyledPosts>
  );
}

export default Posts;
