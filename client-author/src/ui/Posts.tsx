import styled from "styled-components";
import { Link, useSearchParams } from "react-router";

import { formatPostDate } from "../utils/formatPostDate";
import { formatString } from "../utils/formatString";

import { Post as PostType } from "../types/types";

import ProfileImage from "./ProfileImage";
import Spinner from "./Spinner";
import PostActions from "./PostActions";
import BookmarkAction from "./BookmarkAction";
import PostTags from "./PostTags";

const StyledPosts = styled.div`
  margin-top: 3rem;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 3rem;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Post = styled.div`
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.2s ease-out;
  overflow: hidden; /* Ensures the image respects border-radius */
  position: relative;

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
  flex-grow: 1;
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

const Description = styled.div`
  flex-grow: 1;
`;

const NoResults = styled.div`
  text-align: center;
  margin: 3rem 0;
  font-size: 1.6rem;
  color: var(--color-grey-500);
`;

function Posts({ posts }: { posts: PostType[] }) {
  const [searchParams] = useSearchParams();

  const currentTag = searchParams.get("tag") || "all";
  const currentSearch = searchParams.get("s") || "";

  if (!posts) return <Spinner />;

  return posts && posts.length > 0 ? (
    <StyledPosts>
      {posts.map((post) => (
        <Post key={post.id}>
          <Link to={`/post/${post.id}`}>
            <ImageWrapper>
              <Image src="/logo.jpg" />
              <PostTags tags={post.tags} />
            </ImageWrapper>
          </Link>
          <BookmarkAction post={post} />
          <PostDetails>
            <Head>
              <span>{formatPostDate(post.createdAt)}</span>
              <PostActions post={post} />
            </Head>

            <Title>
              <Link to={`/post/${post.id}`}>
                {formatString(post.title, 100)}
              </Link>
            </Title>
            <Description>{formatString(post.description, 150)}</Description>
            <Author>
              <ProfileImage imgSrc={post.author?.avatar} size="sm" />
              <span>{post.author?.username}</span>
            </Author>
          </PostDetails>
        </Post>
      ))}
    </StyledPosts>
  ) : (
    <NoResults>
      No posts found {currentSearch && `for "${currentSearch}"`}
      {currentTag !== "all" && ` with tag "${currentTag}"`}.
    </NoResults>
  );
}

export default Posts;
