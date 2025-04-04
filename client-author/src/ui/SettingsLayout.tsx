import { Outlet } from "react-router";
import styled from "styled-components";

import SettingsSidebar from "./SettingsSidebar";
import BackButton from "./BackButton";

const StyledProfileLayout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  height: 100vh;
  background-color: var(--color-grey-50);
  padding: 5rem 15rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);

  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

function SettingsLayout() {
  return (
    <StyledProfileLayout>
      <SettingsSidebar />
      <Main>
        <BackButton to="/" posContext="settings" />
        <Outlet />
      </Main>
    </StyledProfileLayout>
  );
}

export default SettingsLayout;
