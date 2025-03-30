import styled from "styled-components";
import Post from "../ui/Post";

import EditPost from "../ui/EditPost";

const StyledPostEdit = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  & > button {
    align-self: flex-end;
  }
`;

function PostEditPage() {
  return (
    <StyledPostEdit>
      <EditPost />
      <Post />
    </StyledPostEdit>
  );
}

export default PostEditPage;
