import styled from "styled-components";
import Logo from "./Logo";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import Button from "./Button";
import Input from "./Input";

const StyledFooter = styled.div`
  display: grid;
  grid-template-columns: 40rem auto auto auto;
  gap: 3rem;
  margin-top: 5rem;
`;

const Subscribe = styled.div`
  display: flex;
  justify-content: center;
`;
const Media = styled.div`
  display: flex;
  gap: 1rem;
  align-self: flex-end;

  & svg {
    height: 2.5rem;
    width: auto;
  }
`;

function Footer() {
  return (
    <StyledFooter>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Logo size="sm" />
          <span>Backend Weekly</span>
        </div>
        <p>
          Explain complex concepts in Backend Engineering, sharing exclusive
          backend engineering resources, and helping you become a great Backend
          Engineer.
        </p>
        <span>&copy; {new Date().getFullYear()} Backend Weekly</span>
      </div>
      <div>
        <strong>Home</strong>
        <p>Posts</p>
      </div>
      <div>
        <strong>Products</strong>
        <p>products</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <Subscribe style={{ alignSelf: "flex-end" }}>
          <Input
            type="text"
            placeholder="Enter your email"
            style={{
              width: "300px",
              borderTopRightRadius: "0",
              borderBottomRightRadius: "0",
            }}
          />
          <Button variation="subscribe">Subscribe</Button>
        </Subscribe>
        <Media>
          <a href="https://github.com/EmirYscn" target="_blank">
            <FaGithub />
          </a>
          <a href="https://github.com/EmirYscn" target="_blank">
            <FaLinkedin />
          </a>
          <a href="https://github.com/EmirYscn" target="_blank">
            <FaXTwitter />
          </a>
        </Media>
      </div>
    </StyledFooter>
  );
}

export default Footer;
