import styled from "styled-components";
import Button from "./Button";
import { IoBookmark } from "react-icons/io5";

const StyledBookmarkAction = styled.div<{ $isFeatured: boolean }>`
  position: absolute;
  top: 1rem;
  right: 1rem;

  button svg {
    color: ${(props) =>
      props.$isFeatured ? "var(--color-orange-100);" : "var(--color-grey-800)"};
    /* color: var(--color-orange-100); */
    transition: all 0.3s ease;
  }

  button:hover svg {
    color: ${(props) =>
      props.$isFeatured
        ? "var(--color-grey-800)"
        : "var(--color-orange-100);"}; /* Change to your desired color */
  }
`;

function BookmarkAction({ isFeatured }: { isFeatured: boolean }) {
  return (
    <StyledBookmarkAction $isFeatured={isFeatured}>
      <Button icon={<IoBookmark />} size="large" />
    </StyledBookmarkAction>
  );
}

export default BookmarkAction;
