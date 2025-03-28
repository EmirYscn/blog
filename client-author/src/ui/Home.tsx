import styled from "styled-components";

import FeaturedPosts from "./FeaturedPosts";
import Archive from "./Archive";

import CreatePost from "./CreatePost";
import PublishedPosts from "./PublishedPosts";
import UnpublishedPosts from "./UnpublishedPosts";

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 120rem;
  width: 100%;
  margin: 0 auto;

  & > *:nth-child(n + 3) {
    margin-top: 10rem;
  }
`;

function Home() {
  return (
    <StyledHome>
      <CreatePost />
      <FeaturedPosts />
      <UnpublishedPosts />
      <PublishedPosts />
      <Archive />
    </StyledHome>
  );
}

export default Home;
