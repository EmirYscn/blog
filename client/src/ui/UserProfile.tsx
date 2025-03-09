import styled from "styled-components";
import { useProfile } from "../hooks/useProfile";
import ProfileImage from "./ProfileImage";
import Spinner from "./Spinner";

const StyledUserProfile = styled.div`
  height: 100%;
`;

function UserProfile() {
  const { profile, isLoading, error } = useProfile();

  if (isLoading) return <Spinner />;

  return (
    <StyledUserProfile>
      <ProfileImage imgSrc={profile?.user?.avatar} size="lg" />
      <h1>{profile?.user?.username}</h1>
      <span>{profile?.bio}</span>
    </StyledUserProfile>
  );
}

export default UserProfile;
