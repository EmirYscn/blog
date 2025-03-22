import styled from "styled-components";
import ProfileImage from "./ProfileImage";
import { FaBars, FaRegBell } from "react-icons/fa6";
import Button from "./Button";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router";
import { useUser } from "../hooks/useUser";
import { useLogout } from "../hooks/useLogout";
import DarkModeToggle from "./DarkModeToggle";
import { useDarkMode } from "../contexts/DarkMode/ThemeContextProvider";
import Menus from "./Menus";
import { IoPerson, IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { useState } from "react";

const StyledHeader = styled.div<{ $isDarkMode?: boolean }>`
  /* padding: 1rem 20rem; */
  padding: 1rem 0;
  background-color: var(--color-grey-50);
  box-shadow: var(--shadow-sm);
  z-index: 100;
  /* border-bottom: 1px solid
    ${(props) => (props.$isDarkMode ? "#d1a5864d" : "#1d5d914d")}; */
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Container = styled.div`
  /* padding: 0 2rem; */
  max-width: 120rem;
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1308px) {
    padding: 0 2rem;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none; /* Hide profile section on small screens */
  }
`;

const MobileMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

const MenuDrawer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
  width: 250px;
  height: 100vh;
  background: var(--color-grey-50);
  box-shadow: var(--shadow-lg);
  transition: right 0.3s ease-in-out;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated } = useUser();
  const { logout } = useLogout();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  return (
    <StyledHeader $isDarkMode={isDarkMode}>
      <Container>
        <Logo size="sm" />
        <ProfileContainer>
          <DarkModeToggle />
          <Button icon={<FaRegBell />} />
          <Button variation="primary" onClick={() => navigate("/subscribe")}>
            Subscribe
          </Button>
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
                      onClick={() => navigate(`/profile/${user?.id}`)}
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

        {/* Mobile Menu */}
        <MobileMenu>
          <Button
            variation="icon"
            icon={<FaBars />}
            onClick={() => setMenuOpen(true)}
          />
        </MobileMenu>

        {/* Mobile Drawer Menu */}
        <MenuDrawer $isOpen={isMenuOpen}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button icon={<FaBars />} onClick={() => setMenuOpen(false)} />
            <div style={{ display: "flex" }}>
              <DarkModeToggle />
              <Button icon={<FaRegBell />} />
            </div>
          </div>
          <Button variation="primary">
            <Link to="/subscribe">Subscribe</Link>
          </Button>
          {isAuthenticated ? (
            <>
              <Button
                variation="normal"
                onClick={() => navigate(`/profile/${user?.id}`)}
              >
                Profile
              </Button>
              <Button variation="normal" onClick={() => navigate("/settings")}>
                Settings
              </Button>
              <Button variation="normal" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <Button variation="login">
              <Link to={"/login"}>Login</Link>
            </Button>
          )}
        </MenuDrawer>
      </Container>
    </StyledHeader>
  );
}

export default Header;
