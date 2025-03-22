import styled from "styled-components";
import { usePost } from "../hooks/usePost";
import PostUserCard from "./PostUserCard";
import Spinner from "./Spinner";
import Footer from "./Footer";

const StyledPost = styled.div`
  display: grid;
  /* flex-direction: column; */
  grid-template-rows: 1fr auto;
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
  gap: 2rem;
  /* flex-grow: 1; */
`;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
        <Intro>
          <Title>{post?.title}</Title>
          <Description>{post?.content}</Description>
          <PostUserCard post={post!} />
        </Intro>
        <Content>{post?.content}</Content>
      </PostContent>
    </StyledPost>
  );
}

export default Post;
