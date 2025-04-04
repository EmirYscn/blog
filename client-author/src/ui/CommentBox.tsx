import { Link } from "react-router";
import styled from "styled-components";
import Button from "./Button";
import { useUser } from "../hooks/useUser";
import ProfileImage from "./ProfileImage";
import { useState } from "react";
import useCreateComment from "../hooks/useCreateComment";

const StyledCommentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* padding: 1.5rem; */
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    /* font-size: 1.2rem; */
    font-weight: 600;
    color: var(--color-grey-800);
  }
`;

const Comment = styled.textarea`
  background-color: var(--color-grey-50);
  padding: 1rem;
  border: 1px solid var(--color-grey-200);
  border-radius: 8px;
  resize: none;
  /* font-size: 1rem; */
  min-height: 100px;
  transition: border 0.2s ease-in-out;
  overflow: auto;

  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
    /* background-color: var(--color-white); */
  }
`;

const LoginPrompt = styled.div`
  /* font-size: 0.9rem; */
  color: var(--color-grey-600);
  /* text-align: center; */
  /* padding: 0 1rem; */
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    color: var(--color-brand-600);
    font-weight: 500;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SendButton = styled.div`
  align-self: flex-end;
`;

const CommentAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

function CommentBox({
  parentCommentId = null,
  onSuccess,
}: {
  parentCommentId?: string | null;
  onSuccess?: () => void;
}) {
  const { user, isAuthenticated } = useUser();
  const [text, setText] = useState("");
  const { comment, isLoading: isSending } = useCreateComment();

  async function handleComment() {
    if (!text) return;

    comment(
      { comment: text, parentCommentId },
      {
        onSuccess: () => {
          setText("");
          onSuccess?.();
        },
      }
    );
  }

  return (
    <StyledCommentBox>
      <Head>
        <h3>Reply</h3>
      </Head>
      
      <Comment
        placeholder="Add your comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleComment();
          }
        }}
      />

      <LoginPrompt>
        {!isAuthenticated ? (
          <div>
            <Link to="/login">Login</Link> or{" "}
            <Link to="/subscribe">Subscribe</Link> to comment
          </div>
        ) : (
          <CommentAction>
            <User>
              <ProfileImage imgSrc={user?.avatar} size="sm" />
              <span>{user?.username}</span>
            </User>
            <SendButton onClick={handleComment}>
              <Button variation="primary" disabled={isSending}>
                {isSending ? "Sending..." : "Send"}
              </Button>
            </SendButton>
          </CommentAction>
        )}
      </LoginPrompt>
    </StyledCommentBox>
  );
}

export default CommentBox;
