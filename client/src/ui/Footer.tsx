import styled from "styled-components";
import Logo from "./Logo";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import Button from "./Button";
import Input from "./Input";

const StyledFooter = styled.div`
  width: 100%;
  background-color: var(--color-grey-50);
  padding: 2rem 1rem;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); */
  grid-template-columns: 30rem auto auto auto;
  gap: 3rem;
  background-color: var(--color-grey-50);
  padding: 3rem 0;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Subscribe = styled.div`
  display: flex;
  justify-content: center;
  /* flex-wrap: wrap; */
  /* gap: 0.5rem; */
  width: 100%;

  @media (max-width: 568px) {
    flex-direction: column;
    align-items: stretch;
  }
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

const EmailInput = styled(Input)`
  flex: 1;
  min-width: 200px;
  max-width: 300px;
  /* width: 300px; */
  border-top-right-radius: ${(props) => (props.type === "text" ? "0" : "4px")};
  border-bottom-right-radius: ${(props) =>
    props.type === "text" ? "0" : "4px"};

  @media (max-width: 568px) {
    max-width: none;
    border-radius: 4px;
  }
`;

const SubscribeButton = styled(Button)`
  @media (max-width: 568px) {
    border-radius: 4px;
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
          <Subscribe>
            <EmailInput type="text" placeholder="Enter your email" />
            <SubscribeButton variation="subscribe">Subscribe</SubscribeButton>
          </Subscribe>
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
