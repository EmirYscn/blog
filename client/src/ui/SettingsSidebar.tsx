import styled from "styled-components";
import { NavLink } from "react-router";
import { FaLock, FaRegUser } from "react-icons/fa6";

const StyledSidebar = styled.header`
  background-color: var(--color-grey-100);
  padding: 3.2rem 2.4rem;
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  align-items: center;
  justify-content: center;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    font-size: 1.5rem;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function SettingsSidebar() {
  return (
    <StyledSidebar>
      <nav>
        <NavList>
          <li>
            <StyledNavLink to="/settings/profile" end>
              <FaRegUser />
              <span>Profile</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/settings/password">
              <FaLock />
              <span>Change Password</span>
            </StyledNavLink>
          </li>
        </NavList>
      </nav>
    </StyledSidebar>
  );
}

export default SettingsSidebar;
