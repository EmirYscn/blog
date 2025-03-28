import { useState, KeyboardEvent } from "react";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router";
import styled from "styled-components";
import Button from "./Button";

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 600px;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.2rem;
  padding-right: 4rem;
  font-size: 1.4rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 100px;
  outline: none;
  transition: all 0.3s ease;
  background-color: var(--color-grey-50);

  &:focus {
    border-color: var(--color-brand-600);
    box-shadow: 0 0 0 2px rgba(29, 93, 145, 0.1);
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 15px;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-grey-200);
  }

  &:focus {
    outline: none;
  }

  & svg {
    width: 1.8rem;
    height: 1.8rem;
    color: var(--color-grey-500);
  }
`;

const CurrentSearch = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid var(--color-grey-900);
  border-radius: 100px;
  width: max-content;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  gap: 0.3rem;
`;

type SearchBarProps = {
  navigateTo?: string; // Optional prop with default value
};

const SearchBar = ({ navigateTo = "" }: SearchBarProps) => {
  const [value, setValue] = useState<string>("");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSearch() {
    if (!value.trim()) return;

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", "1");
    newSearchParams.set("s", value.trim());
    navigate(`/${navigateTo}?${newSearchParams.toString()}`);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  function resetSearch() {
    searchParams.delete("s");
    setSearchParams(searchParams);
  }

  return (
    <>
      <SearchBarContainer>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Search input"
        />
        <SearchButton onClick={handleSearch} aria-label="Search">
          <IoSearchOutline />
        </SearchButton>
      </SearchBarContainer>
      {searchParams.get("s") && (
        <CurrentSearch>
          <Button onClick={resetSearch} variation="search">
            <IoClose />
          </Button>
          <span>{searchParams.get("s")}</span>
        </CurrentSearch>
      )}
    </>
  );
};

export default SearchBar;
