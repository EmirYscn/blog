import toast from "react-hot-toast";
import { IoBookmark } from "react-icons/io5";
import styled from "styled-components";

import { Post } from "../types/types";
import { useUpdatePost } from "../hooks/useUpdatePost";

import Button from "./Button";

const StyledBookmarkAction = styled.div<{ $isFeatured: boolean }>`
  position: absolute;
  top: 1rem;
  right: 1rem;

  button svg {
    color: ${(props) =>
      props.$isFeatured ? "var(--color-orange-100);" : "var(--color-grey-800)"};

    transition: all 0.3s ease;
  }

  button:hover svg {
    color: ${(props) =>
      props.$isFeatured ? "var(--color-grey-800)" : "var(--color-orange-100);"};
  }
`;

function BookmarkAction({ post }: { post: Post }) {
  const { update, isLoading: isUpdating } = useUpdatePost();

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
  return (
    <StyledBookmarkAction $isFeatured={post.featured}>
      <Button
        icon={<IoBookmark />}
        size="large"
        disabled={isUpdating}
        onClick={handleBookmark}
      />
    </StyledBookmarkAction>
  );
}

export default BookmarkAction;
