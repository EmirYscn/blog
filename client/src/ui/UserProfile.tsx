import styled from "styled-components";

import { useProfile } from "../hooks/useProfile";

import ProfileImage from "./ProfileImage";
import Spinner from "./Spinner";
import Posts from "./Posts";
import Pagination from "./Pagination";
import { useUserPosts } from "../hooks/useUserPosts";

const StyledUserProfile = styled.div`
  display: flex;
  flex-direction: column;
`;

const Profile = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding-bottom: 3rem;
`;

const ProfileDetails = styled.div`
  align-self: self-end;
`;

function UserProfile() {
  const { profile, isLoading } = useProfile();
  const { posts, count } = useUserPosts();

  if (isLoading) return <Spinner />;

  return (
    <StyledUserProfile>
      <Profile>
        <ProfileImage imgSrc={profile?.user?.avatar} size="lg" />
        <ProfileDetails>
          <h1>@{profile?.user?.username}</h1>
          <span>{profile?.bio}</span>
        </ProfileDetails>
      </Profile>
      <Posts posts={posts} />
      {count > 0 && <Pagination count={count} />}
    </StyledUserProfile>
  );
}

export default UserProfile;
