import styled from "styled-components";

const PaginationButton = styled.button<{ active?: boolean }>`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-white)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

type PageButtonsProps = {
  goToPage: (pageCount: number) => void;
  pageCount: number;
  currentPage: number;
};

function PageButtons({ goToPage, pageCount, currentPage }: PageButtonsProps) {
  const pageButtons = [];
  const pagesToShow = 5;

  if (pageCount <= pagesToShow) {
    for (let i = 1; i <= pageCount; i++) {
      pageButtons.push(
        <PaginationButton
          key={i}
          onClick={() => goToPage(i)}
          active={currentPage === i}
        >
          {i}
        </PaginationButton>
      );
    }
  } else {
    // Always show first page
    pageButtons.push(
      <PaginationButton
        key={1}
        onClick={() => goToPage(1)}
        active={currentPage === 1}
      >
        1
      </PaginationButton>
    );

    let startPage: number;
    let endPage: number;

    if (currentPage <= 3) {
      // Near the beginning
      startPage = 2;
      endPage = 4;

      pageButtons.push(
        ...Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => i + startPage
        ).map((page) => (
          <PaginationButton
            key={page}
            onClick={() => goToPage(page)}
            active={currentPage === page}
          >
            {page}
          </PaginationButton>
        ))
      );

      // Add ellipsis and last page
      pageButtons.push(
        <PaginationButton key="ellipsis-end" disabled>
          ...
        </PaginationButton>,
        <PaginationButton
          key={pageCount}
          onClick={() => goToPage(pageCount)}
          active={currentPage === pageCount}
        >
          {pageCount}
        </PaginationButton>
      );
    } else if (currentPage >= pageCount - 2) {
      // Near the end
      // Add ellipsis after first page
      pageButtons.push(
        <PaginationButton key="ellipsis-start" disabled>
          ...
        </PaginationButton>
      );

      startPage = pageCount - 3;
      endPage = pageCount - 1;

      pageButtons.push(
        ...Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => i + startPage
        ).map((page) => (
          <PaginationButton
            key={page}
            onClick={() => goToPage(page)}
            active={currentPage === page}
          >
            {page}
          </PaginationButton>
        ))
      );

      // Add last page
      pageButtons.push(
        <PaginationButton
          key={pageCount}
          onClick={() => goToPage(pageCount)}
          active={currentPage === pageCount}
        >
          {pageCount}
        </PaginationButton>
      );
    } else {
      // Somewhere in the middle
      pageButtons.push(
        <PaginationButton key="ellipsis-start" disabled>
          ...
        </PaginationButton>
      );

      // Show current page and one page on each side
      startPage = currentPage - 1;
      endPage = currentPage + 1;

      pageButtons.push(
        ...Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => i + startPage
        ).map((page) => (
          <PaginationButton
            key={page}
            onClick={() => goToPage(page)}
            active={currentPage === page}
          >
            {page}
          </PaginationButton>
        ))
      );

      pageButtons.push(
        <PaginationButton key="ellipsis-end" disabled>
          ...
        </PaginationButton>,
        <PaginationButton
          key={pageCount}
          onClick={() => goToPage(pageCount)}
          active={currentPage === pageCount}
        >
          {pageCount}
        </PaginationButton>
      );
    }
  }
  return pageButtons;
}

export default PageButtons;
