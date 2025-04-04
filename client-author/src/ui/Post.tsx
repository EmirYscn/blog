import styled from "styled-components";
import { usePost } from "../hooks/usePost";
import PostUserCard from "./PostUserCard";
import Spinner from "./Spinner";
import CommentBox from "./CommentBox";
import Comments from "./Comments";
import NavInfo from "./NavInfo";
import DOMPurify from "dompurify";
import BackButton from "./BackButton";

const StyledPost = styled.div`
  display: flex;
  flex-direction: column;
  /* grid-template-rows: 1fr auto; */
  /* height: 100vh; */
  /* flex-direction: column; */
  /* gap: 2rem; */
  /* max-width: 60rem; */
  /* width: 100%;
  margin: 0 auto; */
  position: relative;
`;

const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60rem;
  width: 100%;
  margin: 0 auto;
  gap: 4rem;
  /* flex-grow: 1; */
`;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const Title = styled.h1``;

const Description = styled.p``;

const Content = styled.div`
  /* width: 40rem; */
  line-break: anywhere;
`;

function Post() {
  const { post, isLoading, error } = usePost();

  // const description = formatString(post?.content);

  if (isLoading) return <Spinner />;
  if (error) return <p>Post could not found</p>;

  return (
    <StyledPost>
      <BackButton to="/" posContext="post" />
      <PostContent>
        <NavInfo postTitle={post?.title} />
        <Intro>
          <Title>{post?.title}</Title>
          <Description>{post?.description}</Description>
          <PostUserCard post={post!} />
        </Intro>
        <Content
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post?.content || ""),
          }}
        />
        <CommentBox />
        {post?.comments && post.comments.length > 0 && (
          <>
            <h2>Comments</h2>
            <Comments />
          </>
        )}
      </PostContent>
    </StyledPost>
  );
}

export default Post;
