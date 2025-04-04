import styled from "styled-components";

import Heading from "../../ui/Heading";
import ProfileSettings from "../../ui/ProfileSettings";

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

function Profile() {
  return (
    <StyledSettings>
      <Heading as="h4">Profile Settings</Heading>
      <ProfileSettings />
    </StyledSettings>
  );
}

export default Profile;
