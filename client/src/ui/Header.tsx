import styled, { css } from "styled-components";
import ProfileImage from "./ProfileImage";
import { FaRegBell } from "react-icons/fa6";
import Button from "./Button";
import { FiPlus } from "react-icons/fi";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import { Link } from "react-router";
import { useUser } from "../hooks/useUser";
import { useLogout } from "../hooks/useLogout";
import DarkModeToggle from "./DarkModeToggle";
import { useDarkMode } from "../contexts/DarkMode/ThemeContextProvider";

const StyledHeader = styled.div<{ $isDarkMode?: boolean }>`
  padding: 1rem 4rem;
  background-color: var(--color-grey-50);
  /* box-shadow: var(--shadow-md); */
  border-bottom: 1px solid
    ${(props) => (props.$isDarkMode ? "#d1a5864d" : "#1d5d914d")};
  position: fixed; /* Make the header fixed at the top */
  top: 0;
  left: 0;
  right: 0;
  z-index: 10; /* Ensures the header stays on top of other elements */
  width: 100%; /* Make sure it stretches across the screen */
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* position: relative; */

  ${(props) =>
    props.$isDarkMode &&
    css`
      background-color: var(--color-black-200);
      color: var(--color-grey-200);
    `}
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SearchContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
`;

function Header() {
  const { isAuthenticated } = useUser();
  const { logout, isPending } = useLogout();
  const { isDarkMode } = useDarkMode();

  return (
    <StyledHeader $isDarkMode={isDarkMode}>
      <Logo size="sm" />
      <SearchContainer>
        <SearchBar />
      </SearchContainer>
      <ProfileContainer>
        <Button icon={<FiPlus />} variation="create">
          <span>Create</span>
        </Button>
        <DarkModeToggle />
        <Button icon={<FaRegBell />} />
        {isAuthenticated ? (
          <>
            <ProfileImage size="sm" />
            <Button variation="logout" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <Button variation="login">
            <Link to={"/login"}>Login</Link>
          </Button>
        )}
      </ProfileContainer>
    </StyledHeader>
  );
}

export default Header;
