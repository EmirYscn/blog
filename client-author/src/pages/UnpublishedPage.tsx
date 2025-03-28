import styled from "styled-components";
import UnpublishedPosts from "../ui/UnpublishedPosts";

const StyledUnpublished = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 120rem;
  width: 100%;
  margin: 0 auto;
`;

function UnpublishedPage() {
  return (
    <StyledUnpublished>
      <UnpublishedPosts />
    </StyledUnpublished>
  );
}

export default UnpublishedPage;
