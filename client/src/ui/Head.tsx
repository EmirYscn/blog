import styled from "styled-components";
import Logo from "./Logo";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import SubscribeButton from "./SubscribeButton";

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const Heading = styled.h1`
  font-size: 4rem;
  text-align: center;
`;

const Para = styled.p`
  width: 50%;
  font-size: 3rem;
  font-weight: 100;
  text-align: center;
`;

const Social = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  /* flex-direction: column; */
`;

const Media = styled.div`
  display: flex;
  gap: 1rem;

  & svg {
    height: 2.5rem;
    width: auto;
  }
`;

function Head() {
  return (
    <Header>
      <Logo />
      <Heading>Backend Weekly</Heading>
      <Para>
        Explain complex concepts in Backend Engineering, sharing exclusive
        backend engineering resources, and helping you become a great Backend
        Engineer.
      </Para>
      <SubscribeButton />
      <Social>
        <Author>
          <span>Written By EmirYscn</span>
        </Author>
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
      </Social>
    </Header>
  );
}

export default Head;
