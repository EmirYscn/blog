import styled from "styled-components";

import { useAuthor } from "../hooks/useAuthor";

import FeaturedPosts from "./FeaturedPosts";
import Archive from "./Archive";
import Footer from "./Footer";
import Head from "./Head";
import { useAuthorPosts } from "../hooks/useAuthorPosts";

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

      <Footer />
    </StyledHome>
  );
}

export default Home;
