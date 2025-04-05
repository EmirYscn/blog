import styled from "styled-components";
import { Link } from "react-router";
import { IoIosCopy } from "react-icons/io";
import { FaComment, FaHeart } from "react-icons/fa6";

import { Post } from "../types/types";

import { useLikePost } from "../hooks/useLikePost";
import { useUser } from "../hooks/useUser";
import useCopyPostLink from "../hooks/useCopyPostLink";

import Button from "./Button";

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
  const { like } = useLikePost();
  const { copyLink, isLoading: isCopying } = useCopyPostLink();
  const { user } = useUser();
  const isLiked = post.likes?.some((like) => like.userId === user?.id);

  async function handleLike() {
    like(post.id);
  }

  return (
    <StyledPostActions>
      <LikeButtonWrapper $isLiked={isLiked}>
        <Button icon={<FaHeart />} variation="icon" onClick={handleLike}>
          <span>{post._count.likes}</span>
        </Button>
      </LikeButtonWrapper>
      <CommentButtonWrapper>
        <Link to={`/post/${post.id}`}>
          <Button icon={<FaComment />} variation="icon">
            <span>{post._count.comments}</span>
          </Button>
        </Link>
      </CommentButtonWrapper>
      <ShareButtonWrapper>
        <Button
          icon={<IoIosCopy />}
          variation="icon"
          onClick={() => copyLink(post.id)}
          disabled={isCopying}
        />
      </ShareButtonWrapper>
    </StyledPostActions>
  );
}

export default PostActions;
