import styled from "styled-components";
import { usePost } from "../hooks/usePost";
import PostUserCard from "./PostUserCard";
import Spinner from "./Spinner";
import Footer from "./Footer";
import CommentBox from "./CommentBox";
import Comments from "./Comments";
import NavInfo from "./NavInfo";

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

const Content = styled.div``;

function Post() {
  const { post, isLoading, error } = usePost();

  if (isLoading) return <Spinner />;
  if (error) return <p>Post could not found</p>;

  return (
    <StyledPost>
      <PostContent>
        <NavInfo postTitle={post?.title} />
        <Intro>
          <Title>{post?.title}</Title>
          <Description>{post?.content}</Description>
          <PostUserCard post={post!} />
        </Intro>
        <Content>{post?.content}</Content>
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
