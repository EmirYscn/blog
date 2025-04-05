import styled from "styled-components";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

import Logo from "./Logo";
import SubscribeButton from "./SubscribeButton";

const StyledFooter = styled.div`
  width: 100%;
  background-color: var(--color-grey-50);
  padding: 2rem 1rem;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 30rem auto auto auto;
  gap: 3rem;
  background-color: var(--color-grey-50);
  padding: 3rem 0;

  @media (max-width: 920px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Media = styled.div`
  display: flex;
  gap: 1rem;
  align-self: flex-end;
  justify-content: center;

  & svg {
    height: 2.5rem;
    width: auto;
  }

  @media (max-width: 768px) {
    align-self: center;
  }
`;

function Footer() {
  return (
    <StyledFooter>
      <Container>
        <Column>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Logo size="sm" />
            <span>Backend Weekly</span>
          </div>
          <p>
            Explain complex concepts in Backend Engineering, sharing exclusive
            backend engineering resources, and helping you become a great
            Backend Engineer.
          </p>
          <span>&copy; {new Date().getFullYear()} Backend Weekly</span>
        </Column>
        <Column>
          <strong>Home</strong>
          <p>Posts</p>
        </Column>
        <Column>
          <strong>Products</strong>
          <p>products</p>
        </Column>
        <Column>
          <SubscribeButton style={{ alignSelf: "flex-end" }} />

          <Media>
            <a
              href="https://github.com/EmirYscn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://github.com/EmirYscn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/EmirYscn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter />
            </a>
          </Media>
        </Column>
      </Container>
    </StyledFooter>
  );
}

export default Footer;
