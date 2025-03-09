import styled from "styled-components";
import ProfileImage from "./ProfileImage";
import Button from "./Button";
import { LuHeart } from "react-icons/lu";
import { FaRegCommentDots } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";
import PostMenus from "./PostMenus";
import { formatPostDate } from "../utils/formatPostDate";
import { usePosts } from "../hooks/usePosts";
import Spinner from "./Spinner";
import { Link } from "react-router";

// const posts = [
//   {
//     id: 1,
//     createdAt: new Date("2025-02-01T10:00:00Z"),
//     updatedAt: new Date("2025-02-01T10:00:00Z"),
//     deletedAt: null,
//     title: "Introduction to React",
//     content:
//       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam nulla recusandae placeat adipisci voluptas laudantium nihil eligendi eveniet nisi earum quae consequatur, ducimus voluptate illo consequuntur corrupti aperiam est nobis reprehenderit ad. Reprehenderit delectus ipsum id alias corrupti at doloremque saepe quibusdam, ab neque nam numquam atque esse ducimus omnis?",
//     published: true,
//     author: { id: 11, username: "Laura" },
//     comments: [
//       { author: "Alice", content: "Great introduction!" },
//       { author: "Bob", content: "Very helpful, thanks!" },
//     ],
//     tags: ["React", "JavaScript", "Frontend"],
//     media: [],
//   },
//   {
//     id: 2,
//     createdAt: new Date("2024-02-02T14:30:00Z"),
//     updatedAt: new Date("2024-02-02T14:30:00Z"),
//     deletedAt: null,
//     title: "Understanding Prisma with PostgreSQL",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse sed, doloremque debitis, recusandae laborum optio voluptates iusto vel dicta dolor, eaque officiis in delectus facere incidunt deserunt at mollitia ducimus rem et illum accusamus. Velit dolore voluptatem eum, atque maiores obcaecati commodi illo. Dolorem debitis libero voluptates eius maiores, corporis molestiae, sed officia nam optio doloremque obcaecati maxime dolores quia. Earum, at officiis iste totam non nulla beatae enim, sint expedita veritatis ipsum iusto deserunt est velit unde, eaque voluptates! Deleniti voluptatibus facilis veritatis nam sunt tempore commodi, error fuga consequatur eaque eius mollitia repudiandae voluptatum sequi nesciunt similique aspernatur?",
//     published: true,
//     author: { id: 100, username: "Emir" },
//     comments: [
//       { author: "Charlie", content: "This helped me a lot!" },
//       { author: "Dana", content: "Would love a part 2 on migrations." },
//     ],
//     tags: ["Prisma", "PostgreSQL", "Backend"],
//     media: [],
//   },
//   {
//     id: 3,
//     createdAt: new Date("2025-02-05T09:15:00Z"),
//     updatedAt: new Date("2025-02-05T09:15:00Z"),
//     deletedAt: null,
//     title: "Advanced CSS Techniques",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex tempore illum nobis. Perspiciatis deleniti architecto culpa molestias totam. Quam praesentium consectetur reprehenderit asperiores ducimus facere facilis aperiam rem non veritatis debitis perspiciatis dolorem est temporibus quia officiis, quibusdam iusto tempora doloribus sed quae? Accusamus atque id qui illum amet, similique dignissimos eum? Obcaecati dolorem nulla maxime, odit iure alias, consequuntur incidunt molestias ullam explicabo soluta perspiciatis nesciunt quod aut ut sint amet hic consequatur excepturi dolores recusandae cupiditate fugiat iste a. Nam vitae nesciunt beatae, doloribus rerum quis incidunt soluta est pariatur repudiandae dolor excepturi temporibus totam, accusamus asperiores adipisci. Fuga ad veritatis ut aperiam vel minus esse? Quaerat sunt rerum tenetur aperiam doloribus veritatis dolore molestias fuga, quasi nihil dolorum facilis cum ex nulla voluptatem repellat excepturi consequuntur soluta provident hic dolor. Quam perspiciatis doloremque odit quia excepturi tenetur, vero quaerat, nisi ipsa cumque numquam? Sapiente optio, laudantium quisquam minima maiores perspiciatis, adipisci sed voluptates, reprehenderit hic blanditiis! Et tempora ut porro nulla sint blanditiis deleniti, quia culpa libero quo? Vero dolores nulla inventore nobis nihil perferendis quasi sapiente, eos ex. Mollitia accusamus magni praesentium ut assumenda! Sapiente, unde aspernatur dolore repudiandae iusto voluptatibus similique optio necessitatibus omnis quidem?",
//     published: false,
//     author: { id: 112, username: "Wilson" },
//     comments: [
//       { author: "Eve", content: "Great examples!" },
//       { author: "Frank", content: "Learned some new tricks." },
//     ],
//     tags: ["CSS", "Design", "Web Development"],
//     media: [],
//   },
//   {
//     id: 4,
//     createdAt: new Date("2025-02-10T12:00:00Z"),
//     updatedAt: new Date("2025-02-10T12:00:00Z"),
//     deletedAt: null,
//     title: "Understanding GraphQL",
//     content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit...",
//     published: true,
//     author: { id: 131, username: "Benson" },
//     comments: [
//       { author: "Grace", content: "I needed this, thanks!" },
//       { author: "Henry", content: "GraphQL is the future!" },
//     ],
//     tags: ["GraphQL", "API", "Backend"],
//     media: [],
//   },
//   {
//     id: 5,
//     createdAt: new Date("2025-02-15T16:45:00Z"),
//     updatedAt: new Date("2025-02-15T16:45:00Z"),
//     deletedAt: null,
//     title: "Building a Blog with Next.js",
//     content: "Learn how to create a fast, SEO-friendly blog with Next.js...",
//     published: true,
//     author: { id: 1133, username: "Kyle" },
//     comments: [
//       { author: "Ian", content: "Next.js is awesome!" },
//       { author: "Julia", content: "Thanks for the insights!" },
//     ],
//     tags: ["Next.js", "React", "Blogging"],
//     media: [],
//   },
//   {
//     id: 6,
//     createdAt: new Date("2025-02-15T16:45:00Z"),
//     updatedAt: new Date("2025-02-15T16:45:00Z"),
//     deletedAt: null,
//     title: "Building a Blog with Next.js",
//     content:
//       "Learn how to create a fast, SEO-friendly blog with Next.js and React.",
//     published: true,
//     author: { id: 13321, username: "Morgan" },
//     comments: [],
//     tags: ["Next.js", "React", "Blogging"],
//     media: [],
//   },
//   {
//     id: 7,
//     createdAt: new Date("2025-03-04T18:45:00Z"),
//     updatedAt: new Date("2025-03-04T16:45:00Z"),
//     deletedAt: null,
//     title: "Building a Blog with Next.js",
//     content:
//       "Learn how to create a fast, SEO-friendly blog with Next.js and React.",
//     published: true,
//     author: { id: 116, username: "Tony" },
//     comments: [],
//     tags: ["Next.js", "React", "Blogging"],
//     media: [],
//   },
//   {
//     id: 8,
//     createdAt: new Date("2025-03-04T16:45:00Z"),
//     updatedAt: new Date("2025-02-04T16:45:00Z"),
//     deletedAt: null,
//     title: "Building a Blog with Next.js",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod recusandae eaque deleniti optio. Minima similique soluta placeat pariatur laborum distinctio magnam, tempora autem dolorum fugiat rem eaque recusandae neque blanditiis.",
//     published: true,
//     author: { id: 211, username: "Eve" },
//     comments: [],
//     tags: ["Next.js", "React", "Blogging"],
//     media: [],
//   },
//   {
//     id: 9,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     deletedAt: null,
//     title: "Building a Blog with Next.js",
//     content:
//       "Learn how to create a fast, SEO-friendly blog with Next.js and React.",
//     published: true,
//     author: { id: 119, username: "Jack" },
//     comments: [],
//     tags: ["Next.js", "React", "Blogging"],
//     media: [],
//   },
// ];

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
  width: 80%;
  min-width: 300px;
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

const CommentBox = styled.textarea`
  width: 100%;
  height: 40px;
  /* height: min-content; */
  /* height: auto; */

  padding: 1rem 1.2rem;
  border: 2px solid var(--color-brand-200);
  border-radius: 100px;
  font-size: 1.4rem;
  resize: none;
  outline: none;
  background: var(--color-grey-50);
  transition: all 0.3s ease;

  &:focus {
    border-color: var(--color-brand-500);
    background: var(--color-grey-50);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
`;

const AuthorLink = styled(Link)`
  &:hover {
    text-decoration: underline;
  }
`;

const Comments = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
`;

function Posts() {
  const { posts, isLoading, error } = usePosts();

  if (!posts) return <Spinner />;

  return (
    <StyledPosts>
      {posts.map((post) => (
        <PostCard key={post.id}>
          <PostDetail>
            <Author>
              <ProfileImage imgSrc={post.author?.avatar} size="sm" />
              <AuthorLink to={`profile/${post.author?.id}`}>
                {post.author?.username}
              </AuthorLink>
              <span>&#x2022;</span>
              <span>{formatPostDate(post.createdAt)}</span>
            </Author>
            <PostMenus postId={post.id} authorId={post.author!.id} />
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
          <CommentBox placeholder="Comment..." />
          <Comments>
            {post.comments?.map((comment) => (
              <Comment key={comment.id}>
                <AuthorLink to={`profile/${comment?.author?.id}`}>
                  {comment.author?.username}
                </AuthorLink>
                <span>{comment.content}</span>
              </Comment>
            ))}
          </Comments>
        </PostCard>
      ))}
    </StyledPosts>
  );
}

export default Posts;
