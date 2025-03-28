import styled from "styled-components";
import Button from "./Button";
import { FaBookmark, FaComment, FaHeart, FaTrash } from "react-icons/fa6";
import { Post } from "../types/types";
import { useUser } from "../hooks/useUser";
import Menus from "./Menus";
import { FaEdit } from "react-icons/fa";
import { TbWorldUp } from "react-icons/tb";
import { useUpdatePost } from "../hooks/useUpdatePost";
import toast from "react-hot-toast";
import { IoIosCopy } from "react-icons/io";
import useCopyPostLink from "../hooks/useCopyPostLink";

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
  const { update, isLoading: isUpdating } = useUpdatePost();
  const { copyLink, isLoading: isCopying } = useCopyPostLink();
  const isLiked = post.likes?.some((like) => like.userId === user?.id);

  function handleBookmark() {
    const featured = post.featured ? false : true;

    update(
      { postId: post.id, body: { featured } },
      {
        onSuccess: () => {
          toast.success(
            `Post successfully ${
              post.featured ? "unmarked" : "marked"
            } as featured`
          );
        },
      }
    );
  }

  function handlePublish() {
    const published = post.published ? false : true;

    update(
      { postId: post.id, body: { published } },
      {
        onSuccess: () => {
          toast.success(
            `Post successfully ${post.published ? "unpublished" : "published"}`
          );
        },
      }
    );
  }

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
        <Button
          icon={<IoIosCopy />}
          variation="icon"
          onClick={() => copyLink(post.id)}
          disabled={isCopying}
        />
      </ShareButtonWrapper>
      <Menus>
        <Menus.Menu>
          <Menus.Toggle id={post.id} />
          <Menus.List id={post.id}>
            <Menus.Button icon={<FaEdit />}>Edit</Menus.Button>
            <Menus.Button icon={<FaTrash />}>Delete</Menus.Button>
            <Menus.Button
              icon={<TbWorldUp />}
              onClick={handlePublish}
              disabled={isUpdating}
            >
              {post.published ? "Unpublish" : "Publish"}
            </Menus.Button>
            <Menus.Button
              icon={<FaBookmark />}
              onClick={handleBookmark}
              disabled={isUpdating}
            >
              {post.featured ? "Unmark as featured" : "Mark as featured"}
            </Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </Menus>
    </StyledPostActions>
  );
}

export default PostActions;
