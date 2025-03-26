import styled from "styled-components";
import Button from "./Button";
import { FaComment, FaHeart, FaShare } from "react-icons/fa6";
import { Post } from "../types/types";
import { useUser } from "../hooks/useUser";

const StyledPostActions = styled.div`
  display: flex;
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
const ShareButtonWrapper = styled.div`
  button svg {
    transition: all 0.2s ease;
  }
  button:hover svg {
    color: var(--color-brand-100);
  }
`;

function PostActions({ post }: { post: Post }) {
  const { user } = useUser();
  const isLiked = post.likes?.some((like) => like.userId === user?.id);

  return (
    <StyledPostActions>
      <LikeButtonWrapper $isLiked={isLiked}>
        <Button icon={<FaHeart />} variation="icon">
          <span>{post._count.likes}</span>
        </Button>
      </LikeButtonWrapper>
      <CommentButtonWrapper>
        <Button icon={<FaComment />} variation="icon">
          <span>{post._count.comments}</span>
        </Button>
      </CommentButtonWrapper>
      <ShareButtonWrapper>
        <Button icon={<FaShare />} variation="icon" />
      </ShareButtonWrapper>
    </StyledPostActions>
  );
}

export default PostActions;
