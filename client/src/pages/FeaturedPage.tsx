import styled from "styled-components";
import FeaturedPosts from "../ui/FeaturedPosts";

const StyledFeatured = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 120rem;
  width: 100%;
  margin: 0 auto;
`;

function FeaturedPage() {
  return (
    <StyledFeatured>
      <FeaturedPosts />
    </StyledFeatured>
  );
}

export default FeaturedPage;
