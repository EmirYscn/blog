import styled from "styled-components";
import { useComments } from "../hooks/useComments";
import Spinner from "./Spinner";
import Comment from "./Comment";

const StyledComments = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function Comments() {
  const { comments, isLoading } = useComments();

  if (isLoading) return <Spinner />;

  return (
    <StyledComments>
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </StyledComments>
  );
}

export default Comments;
