import styled from "styled-components";
import { Link, useSearchParams } from "react-router";
import { FaRegCommentDots } from "react-icons/fa6";
import { formatString } from "../utils/formatString";
import { formatPostDate } from "../utils/formatPostDate";
import { LuHeart } from "react-icons/lu";
import { RiShareForwardLine } from "react-icons/ri";
import Button from "./Button";
import ProfileImage from "./ProfileImage";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import Filter from "./Filter";
import { User } from "../types/types";
import { useAuthorPosts } from "../hooks/useAuthorPosts";
import Spinner from "./Spinner";
import PostTags from "./PostTags";

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  /* flex-direction: column; */
`;

const Posts = styled.div`
  margin-top: 3rem;
  /* padding: 2rem; */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 3rem;
`;

const Post = styled.div`
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.2s ease-out;
  overflow: hidden; /* Ensures the image respects border-radius */

  &:hover {
    transform: scale(1.01);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1.9 / 1; /* Maintain aspect ratio */
  overflow: hidden; /* Ensures rounded corners */
  border-radius: 8px 8px 0 0; /* Rounded top corners only */
  display: flex;
  position: relative;
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  display: block;
`;

const PostDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const Title = styled.span`
  font-size: 1.8rem;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostLikesComments = styled.div`
  display: flex;
  /* gap: 1rem; */
`;

const ContentPeek = styled.div``;

const StyledArchive = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 10rem;
`;

const NoResults = styled.div`
  text-align: center;
  margin: 3rem 0;
  font-size: 1.6rem;
  color: var(--color-grey-500);
`;

function Archive({ author }: { author: User }) {
  const { posts, count, isLoading } = useAuthorPosts();
  const [searchParams] = useSearchParams();

  const currentTag = searchParams.get("tag") || "all";
  const currentSearch = searchParams.get("s") || "";

  if (isLoading) return <Spinner />;

  return (
    <StyledArchive>
      <h2>Archive</h2>
      <SearchBar />
      <Filter
        filterField="tag"
        options={[
          { value: "all", label: "All" },
          { value: "api-design", label: "API Design" },
          { value: "design-patterns", label: "Design Patterns" },
          { value: "system-design", label: "System Design" },
          { value: "databases", label: "Databases" },
        ]}
      />

      {posts && posts.length > 0 ? (
        <Posts>
          {posts.map((post) => (
            <Post key={post.id}>
              <Link to={`/post/${post.id}`}>
                <ImageWrapper>
                  <Image src="/logo.jpg" />
                  <PostTags tags={post.tags} />
                </ImageWrapper>
              </Link>

              <PostDetails>
                <Head>
                  <span>{formatPostDate(post.createdAt)}</span>
                  <PostLikesComments>
                    <Button icon={<LuHeart />} variation="iconWithText">
                      <span>{post._count.likes}</span>
                    </Button>
                    <Button
                      icon={<FaRegCommentDots />}
                      variation="iconWithText"
                    >
                      <span>{post._count.comments}</span>
                    </Button>
                    <Button
                      icon={<RiShareForwardLine />}
                      variation="iconWithText"
                    />
                  </PostLikesComments>
                </Head>

                <Title>
                  <Link to={`/post/${post.id}`}>
                    {formatString(post.title, 100)}
                  </Link>
                </Title>
                <ContentPeek>{formatString(post.content!, 100)}</ContentPeek>
                <Author>
                  <ProfileImage imgSrc={author.avatar} size="sm" />
                  <span>{author.username}</span>
                </Author>
              </PostDetails>
            </Post>
          ))}
        </Posts>
      ) : (
        <NoResults>
          No posts found {currentSearch && `for "${currentSearch}"`}
          {currentTag !== "all" && ` with tag "${currentTag}"`}.
        </NoResults>
      )}

      {count > 0 && <Pagination count={count} />}
    </StyledArchive>
  );
}

export default Archive;
