import styled from "styled-components";
import Button from "./Button";
import { FaComment, FaHeart } from "react-icons/fa6";
import { Comment } from "../types/types";

import { useUser } from "../hooks/useUser";

import { useLikeComment } from "../hooks/useLikeComment";

const StyledPostActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const LikeButtonWrapper = styled.div<{ $isLiked?: boolean }>`
  button svg {
    color: ${(props) => (props.$isLiked ? "var(--color-red-700)" : "")};
    transition: all 0.2s ease;
  }
  button:hover svg {
    color: var(--color-red-700);
  }
`;
const CommentButtonWrapper = styled.div`
  button svg {
    transition: all 0.2s ease;
  }
  button:hover svg {
    color: var(--color-brand-100);
  }
`;

function CommentActions({
  comment,
  commentAction,
}: {
  comment: Comment;
  commentAction: () => void;
}) {
  const { like } = useLikeComment();
  const { user } = useUser();
  const isLiked = comment.likes?.some((like) => like.userId === user?.id);

  async function handleLike() {
    like(comment.id);
  }

  return (
    <StyledPostActions>
      <LikeButtonWrapper $isLiked={isLiked}>
        <Button icon={<FaHeart />} variation="action" onClick={handleLike}>
          <span>{comment._count.likes}</span>
        </Button>
      </LikeButtonWrapper>
      <CommentButtonWrapper>
        <Button icon={<FaComment />} variation="action" onClick={commentAction}>
          <span>{comment._count.replies}</span>
        </Button>
      </CommentButtonWrapper>
    </StyledPostActions>
  );
}

export default CommentActions;
