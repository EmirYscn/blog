import styled, { css } from "styled-components";
import Heading from "./Heading";
import Button from "./Button";

const StyledConfirmDelete = styled.div<{ isdark?: boolean }>`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;

    ${(props) =>
      props.isdark &&
      css`
        color: var(--color-grey-200);
      `}
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
`;

type ConfirmDeleteProps = {
  resourceName?: string;
  onConfirm?: (isSoftDelete: boolean) => void;
  disabled?: boolean;
  onCloseModal?: () => void;
};

function ConfirmDeleteModal({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}: ConfirmDeleteProps) {
  function handleSoftDelete() {
    onConfirm?.(true);
  }
  function handleHardDelete() {
    onConfirm?.(false);
  }
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete Post</Heading>
      <p>Are you sure you want to delete this post?</p>

      <Buttons>
        <Button disabled={disabled} onClick={onCloseModal}>
          Cancel
        </Button>
        <div>
          <Button
            variation="danger"
            disabled={disabled}
            onClick={handleSoftDelete}
          >
            Soft Delete
          </Button>
          <Button
            variation="danger"
            disabled={disabled}
            onClick={handleHardDelete}
          >
            Delete permanently
          </Button>
        </div>
      </Buttons>
    </StyledConfirmDelete>
  );
}

export default ConfirmDeleteModal;
