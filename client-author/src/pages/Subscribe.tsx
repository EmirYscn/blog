import styled from "styled-components";

import Logo from "../ui/Logo";
import SubscribeButton from "../ui/SubscribeButton";

const StyledSubscribe = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  background-color: var(--color-grey-50);
`;

const Heading = styled.h1`
  font-size: 4rem;
`;

const Para = styled.p`
  width: 50%;
  font-size: 3rem;
  font-weight: 100;
  text-align: center;
`;

function Subscribe() {
  return (
    <StyledSubscribe>
      <Logo />
      <Heading>Backend Weekly</Heading>
      <Para>
        Explain complex concepts in Backend Engineering, sharing exclusive
        backend engineering resources, and helping you become a great Backend
        Engineer.
      </Para>
      <SubscribeButton />
    </StyledSubscribe>
  );
}

export default Subscribe;
