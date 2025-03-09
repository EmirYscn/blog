import { Outlet } from "react-router";
import styled, { css } from "styled-components";

import Header from "./Header";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr; /* First row for header, second row for content */
  height: 100vh;
`;

const Main = styled.main<{ $isDarkMode?: boolean }>`
  background-color: var(--color-grey-50);
  padding: 6.4rem 4.8rem 6.4rem;
  overflow-y: auto;
`;

const Container = styled.div`
  padding: 4rem 1rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
