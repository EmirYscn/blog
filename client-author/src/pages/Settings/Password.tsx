import styled from "styled-components";

import Heading from "../../ui/Heading";

import PasswordSettings from "../../ui/PasswordSettings";

const StyledSettings = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  padding: 0 3rem;
  gap: 3rem;
  position: relative;

  & h4 {
    align-self: flex-start;
  }
`;

function Password() {
  return (
    <StyledSettings>
      <Heading as="h4">Change Password</Heading>
      <PasswordSettings />
    </StyledSettings>
  );
}

export default Password;
