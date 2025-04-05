import styled from "styled-components";

import PublishedPosts from "../ui/PublishedPosts";

const StyledPublished = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 120rem;
  width: 100%;
  margin: 0 auto;
`;

function PublishedPage() {
  return (
    <StyledPublished>
      <PublishedPosts />
    </StyledPublished>
  );
}

export default PublishedPage;
