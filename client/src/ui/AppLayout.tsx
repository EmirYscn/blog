import { Outlet } from "react-router";
import styled from "styled-components";

import Header from "./Header";
import Footer from "./Footer";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto; /* First row for header, second row for content */
  min-height: 100vh;
`;

const Main = styled.main<{ $isDarkMode?: boolean }>`
  background-color: var(--color-grey-50);
  padding: 6.4rem 4.8rem 6.4rem;
`;

const Container = styled.div`
  padding: 2rem 1rem;
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
      <Footer />
    </StyledAppLayout>
  );
}

export default AppLayout;
