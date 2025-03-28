import { Link, useSearchParams } from "react-router";
import styled from "styled-components";
import { formatPostDate } from "../utils/formatPostDate";

import { formatString } from "../utils/formatString";
import ProfileImage from "./ProfileImage";

import Spinner from "./Spinner";

import PostActions from "./PostActions";
import BookmarkAction from "./BookmarkAction";

import { usePublishedPosts } from "../hooks/usePublishedPosts";
import Pagination from "./Pagination";
import ScrollToTop from "./ScrollToTop";
import SearchBar from "./SearchBar";
import Filter from "./Filter";

const StyledPublishedPosts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Posts = styled.div`
  margin-top: 3rem;
  /* padding: 2rem; */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 3rem;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  /* flex-direction: column; */
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

const ContentPeek = styled.div`
  flex-grow: 1;
`;

const NoResults = styled.div`
  text-align: center;
  margin: 3rem 0;
  font-size: 1.6rem;
  color: var(--color-grey-500);
`;

function PublishedPosts() {
  const { publishedPosts, isLoading, count } = usePublishedPosts();
  const [searchParams] = useSearchParams();

  const currentTag = searchParams.get("tag") || "all";
  const currentSearch = searchParams.get("s") || "";

  if (isLoading) return <Spinner />;

  return (
    <StyledPublishedPosts>
      <h2>Published Posts</h2>
      <ScrollToTop />
      <SearchBar navigateTo="published" />
      <Filter
        filterField="tag"
        navigateTo="published"
        options={[
          { value: "all", label: "All" },
          { value: "api-design", label: "API Design" },
          { value: "design-patterns", label: "Design Patterns" },
          { value: "system-design", label: "System Design" },
          { value: "databases", label: "Databases" },
        ]}
      />
      {publishedPosts && publishedPosts?.length > 0 ? (
        <Posts>
          {publishedPosts?.map((post) => (
            <Post key={post.id}>
              <Link to={`/post/${post.id}`}>
                <ImageWrapper>
                  <Image src="/logo.jpg" />
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
                <ContentPeek>{formatString(post.content!, 100)}</ContentPeek>
                <Author>
                  <ProfileImage imgSrc={post.author?.avatar} size="sm" />
                  <span>{post.author?.username}</span>
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
      {count > 0 && <Pagination count={count} navigateTo="published" />}
    </StyledPublishedPosts>
  );
}

export default PublishedPosts;
