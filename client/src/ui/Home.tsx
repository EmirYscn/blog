import styled from "styled-components";

import { useAuthor } from "../hooks/useAuthor";

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
`;

function Home() {
  const { author } = useAuthor();

  return (
    <StyledHome>
      <Head />

      <FeaturedPosts author={author!} />

      <Archive author={author!} />
    </StyledHome>
  );
}

export default Home;
