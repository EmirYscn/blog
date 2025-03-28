import { useNavigate, useSearchParams } from "react-router";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button<{ active?: boolean }>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-white);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-white);
  }
`;

type FilterOption = {
  value: string;
  label: string;
};

type FilterProps = {
  filterField: string;
  navigateTo?: string;
  options: FilterOption[];
};

function Filter({ filterField, navigateTo = "", options }: FilterProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentFilter = searchParams.get(filterField) || options.at(0)?.value;

  function handleClick(value: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", "1");

    if (value === "all") {
      newSearchParams.delete(filterField);
    } else {
      newSearchParams.set(filterField, value);
    }

    // setSearchParams(searchParams);
    navigate(`/${navigateTo}?${newSearchParams.toString()}`);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
