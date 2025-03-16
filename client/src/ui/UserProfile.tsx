import styled from "styled-components";
import { useProfile } from "../hooks/useProfile";
import ProfileImage from "./ProfileImage";
import Spinner from "./Spinner";
import { formatPostDate } from "../utils/formatPostDate";
import { formatString } from "../utils/formatString";

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

const Posts = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const Post = styled.div`
  border-radius: 8px;
  padding: 2rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

  display: flex;
  flex-direction: column;
  gap: 2rem;
  transition: all 0.2s ease-out;

  &:hover {
    transform: scale(1.01);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
`;

const Image = styled.img`
  object-fit: cover;
`;

const PostDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.span`
  font-size: 1.8rem;
  font-weight: 600;
`;

function UserProfile() {
  const { profile, isLoading } = useProfile();

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

      <Posts>
        {profile?.user?.posts?.map((post) => (
          <Post>
            <ImageWrapper>
              <Image src="/logo.jpg" />
            </ImageWrapper>
            <PostDetails>
              <Title>{formatString(post.title)}</Title>
              <span>{formatPostDate(post.createdAt)}</span>
            </PostDetails>
          </Post>
        ))}
      </Posts>
    </StyledUserProfile>
  );
}

export default UserProfile;
