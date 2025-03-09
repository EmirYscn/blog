import styled from "styled-components";
import UserProfile from "../ui/UserProfile";

const StyledProfile = styled.div`
  height: 100%; // Ensure full height
  display: flex;
  flex-direction: column;
`;

function Profile() {
  return (
    <StyledProfile>
      <UserProfile />
    </StyledProfile>
  );
}

export default Profile;
