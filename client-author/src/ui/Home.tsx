import styled from "styled-components";

import FeaturedPosts from "./FeaturedPosts";
import Archive from "./Archive";

import CreatePost from "./CreatePost";

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 120rem;
  width: 100%;
  margin: 0 auto;
`;

function Home() {
  return (
    <StyledHome>
      <CreatePost />
      <FeaturedPosts />
      <Archive />
    </StyledHome>
  );
}

export default Home;
