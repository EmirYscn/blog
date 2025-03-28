import styled from "styled-components";

import FeaturedPosts from "./FeaturedPosts";
import Archive from "./Archive";
import Head from "./Head";

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 120rem;
  width: 100%;
  margin: 0 auto;

  & > *:nth-child(n + 2) {
    margin-top: 10rem;
  }
`;

function Home() {
  return (
    <StyledHome>
      <Head />

      <FeaturedPosts />

      <Archive />
    </StyledHome>
  );
}

export default Home;
