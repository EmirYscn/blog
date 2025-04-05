import { Link } from "react-router";
import { useState } from "react";
import styled from "styled-components";

import { useUser } from "../hooks/useUser";
import useCreateComment from "../hooks/useCreateComment";

import Button from "./Button";
import ProfileImage from "./ProfileImage";

const StyledCommentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  border-radius: 12px;
  max-width: 600px;
  width: 100%;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
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

  min-height: 100px;
  transition: border 0.2s ease-in-out;
  overflow: auto;

  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
  }
`;

const LoginPrompt = styled.div`
  color: var(--color-grey-600);

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
