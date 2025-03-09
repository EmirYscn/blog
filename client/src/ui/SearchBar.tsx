import { IoSearchOutline } from "react-icons/io5";
import styled from "styled-components";

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 600px; /* You can adjust the max-width as needed */
  margin: 2rem auto; /* Centers the search bar */
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.2rem;
  font-size: 1.4rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 100px;
  outline: none;
  transition: border-color 0.3s ease;
  background-color: var(--color-grey-50);

  &:focus {
    border-color: #1d5d914d;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 15px;
  outline: none;
  border: none;
  background: none;

  &:focus {
    outline: none;
  }
`;

const SearchBar = () => {
  return (
    <SearchBarContainer>
      <SearchInput type="text" placeholder="Search..." />
      <SearchButton>
        <IoSearchOutline />
      </SearchButton>
    </SearchBarContainer>
  );
};

export default SearchBar;
