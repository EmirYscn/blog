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
import Modal from "./Modal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { useDeletePost } from "../hooks/useDeletePost";
import { useNavigate } from "react-router";
import { useLikePost } from "../hooks/useLikePost";

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
  const navigate = useNavigate();
  const { like } = useLikePost();
  const { user } = useUser();
  const { update, isLoading: isUpdating } = useUpdatePost();
  const { deletePost, isLoading: isDeleting } = useDeletePost();
  const { copyLink, isLoading: isCopying } = useCopyPostLink();
  const isLiked = post.likes?.some((like) => like.userId === user?.id);

  async function handleLike() {
    like(post.id);
  }

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

  function handleDeletePost(isSoftDelete: boolean) {
    if (isSoftDelete) {
      update(
        { postId: post.id, body: { deletedAt: new Date() } },
        {
          onSuccess: () => {
            toast.success("Post successfully soft deleted");
          },
        }
      );
    } else {
      deletePost(post.id, {
        onSuccess: () => {
          toast.success("Post successfully deleted");
        },
      });
    }
  }

  return (
    <StyledPostActions>
      <LikeButtonWrapper $isLiked={isLiked}>
        <Button icon={<FaHeart />} variation="icon" onClick={handleLike}>
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
      <Modal>
        <Menus>
          <Menus.Menu>
            <Menus.Toggle id={post.id} />
            <Menus.List id={post.id}>
              <Menus.Button
                icon={<FaEdit />}
                onClick={() => navigate(`/post/edit/${post.id}`)}
              >
                Edit
              </Menus.Button>
              <Modal.Open opens="delete">
                <Menus.Button icon={<FaTrash />}>Delete</Menus.Button>
              </Modal.Open>
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

            <Modal.Window name="delete">
              <ConfirmDeleteModal
                disabled={isDeleting}
                onConfirm={(isSoftDelete: boolean) =>
                  handleDeletePost(isSoftDelete)
                }
              />
            </Modal.Window>
          </Menus.Menu>
        </Menus>
      </Modal>
    </StyledPostActions>
  );
}

export default PostActions;
