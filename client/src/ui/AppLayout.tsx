import { Outlet } from "react-router";
import styled, { css } from "styled-components";

import Header from "./Header";
import { useDarkMode } from "../contexts/DarkMode/ThemeContextProvider";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr; /* First row for header, second row for content */
  height: 100vh;
`;

const Main = styled.main<{ $isDarkMode?: boolean }>`
  background-color: var(--color-grey-50);
  padding: 6.4rem 4.8rem 6.4rem; /* Add top padding to compensate for the header height */
  align-items: center;
  margin-top: 4rem; /* This margin will create space for the fixed header */

  ${(props) =>
    props.$isDarkMode &&
    css`
      background-color: var(--color-black-200);
      color: var(--color-grey-200);
    `}
`;

const Container = styled.div`
  padding: 4rem 1rem;
`;

function AppLayout() {
  const { isDarkMode } = useDarkMode();

  return (
    <StyledAppLayout>
      <Header />
      <Main $isDarkMode={isDarkMode}>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
