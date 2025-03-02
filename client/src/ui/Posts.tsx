import styled from "styled-components";
import ProfileImage from "./ProfileImage";
import Button from "./Button";
import { LuHeart } from "react-icons/lu";
import { FaRegCommentDots } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";
import Menus from "./Menus";
import PostMenus from "./PostMenus";

const posts = [
  {
    id: 1,
    createdAt: new Date("2025-02-01T10:00:00Z"),
    updatedAt: new Date("2025-02-01T10:00:00Z"),
    deletedAt: null,
    title: "Introduction to React",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde id minus illum tenetur doloribus nesciunt optio harum quos. Excepturi odio nobis esse soluta nulla ex possimus nisi officiis, doloribus nesciunt impedit dolorem accusantium ut quos, ab earum praesentium quod? Perspiciatis nam dolore minima optio vitae odit sit nemo, consectetur ratione.",
    published: true,
    author: "Laura",
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
    author: "Emir",
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
    author: "Wilson",
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
    author: "Benson",
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
    author: "Kyle",
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
    author: "Morgan",
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
    author: "Tony",
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
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod recusandae eaque deleniti optio. Minima similique soluta placeat pariatur laborum distinctio magnam, tempora autem dolorum fugiat rem eaque recusandae neque blanditiis.",
    published: true,
    author: "Eve",
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
    author: "Jack",
    comments: [],
    tags: ["Next.js", "React", "Blogging"],
    media: [],
  },
];

const StyledPosts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: 50%;
  margin: 0 auto;
  height: 100%;
  padding: 1rem;
  align-items: center;
`;

const PostCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 70%;
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  padding: 3rem;
  /* border: 1px solid var(--color-brand-200); */
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;

const PostDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.5rem;
`;

const Title = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  /* justify-content: space-between; */
  /* padding-bottom: 1rem; */
`;

const Content = styled.div``;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

function Posts() {
  return (
    <StyledPosts>
      {posts.map((post) => (
        <PostCard key={post.id}>
          <PostDetail>
            <Author>
              <ProfileImage size="sm" />
              <span>{post.author}</span>
              <span>&#x2022;</span>
              <span>{post.createdAt.toDateString()}</span>
            </Author>
            <PostMenus postId={post.id} />
          </PostDetail>
          <Title>
            <h3>{post.title}</h3>
          </Title>
          <Content>
            <p>{post.content}</p>
          </Content>
          <Actions>
            <Button icon={<LuHeart />} variation="iconWithText">
              <span>1,2K</span>
            </Button>
            <Button icon={<FaRegCommentDots />} variation="iconWithText">
              <span>16</span>
            </Button>
            <Button icon={<RiShareForwardLine />} variation="iconWithText">
              <span>Share</span>
            </Button>
          </Actions>
        </PostCard>
      ))}
    </StyledPosts>
  );
}

export default Posts;
