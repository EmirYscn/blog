import styled, { css } from "styled-components";
import ProfileImage from "./ProfileImage";
import { FaRegBell } from "react-icons/fa6";
import Button from "./Button";
import { FiPlus } from "react-icons/fi";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router";
import { useUser } from "../hooks/useUser";
import { useLogout } from "../hooks/useLogout";
import DarkModeToggle from "./DarkModeToggle";
import { useDarkMode } from "../contexts/DarkMode/ThemeContextProvider";
import Menus from "./Menus";
import { IoPerson, IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";

const StyledHeader = styled.div<{ $isDarkMode?: boolean }>`
  padding: 1rem 4rem;
  background-color: var(--color-grey-50);
  box-shadow: var(--shadow-sm);
  z-index: 100;
  /* border-bottom: 1px solid
    ${(props) => (props.$isDarkMode ? "#d1a5864d" : "#1d5d914d")}; */
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  const { user, isAuthenticated } = useUser();
  const { logout, isPending } = useLogout();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

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
            <Menus>
              <Menus.Menu>
                <Menus.Toggle id={user!.id}>
                  <ProfileImage imgSrc={user?.avatar} size="sm" />
                </Menus.Toggle>
                <Menus.List id={user!.id}>
                  <Menus.Button
                    icon={<IoPerson />}
                    onClick={() => navigate(`/profile/${user!.id}`)}
                  >
                    Profile
                  </Menus.Button>
                  <Menus.Button
                    icon={<IoSettingsOutline />}
                    onClick={() => navigate("/settings")}
                  >
                    Settings
                  </Menus.Button>
                  <Menus.Button icon={<TbLogout />} onClick={logout}>
                    Logout
                  </Menus.Button>
                </Menus.List>
              </Menus.Menu>
            </Menus>
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
