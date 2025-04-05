import styled from "styled-components";

import Archive from "../ui/Archive";

const StyledArchive = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 120rem;
  width: 100%;
  margin: 0 auto;
`;

function ArchivePage() {
  return (
    <StyledArchive>
      <Archive />
    </StyledArchive>
  );
}

export default ArchivePage;
