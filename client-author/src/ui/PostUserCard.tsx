import styled from "styled-components";
import { Post } from "../types/types";
import ProfileImage from "./ProfileImage";
import { formatDate } from "../utils/formatPostDate";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

const StyledPostUserCard = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Profile = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  column-gap: 1rem;

  & > :first-child {
    grid-row: 1 / -1;
  }
`;

const Author = styled(Link)`
  text-decoration: underline;
`;
const Date = styled.span``;

const Social = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  & svg {
    height: 2.5rem;
    width: auto;
  }
`;

function PostUserCard({ post }: { post: Post }) {
  return (
    <StyledPostUserCard>
      <Profile>
        <ProfileImage imgSrc={post.author?.avatar} size="md" />
        <Author to={`/profile/${post.author?.id}`}>
          {post.author?.username}
        </Author>
        <Date>{formatDate(post.createdAt)}</Date>
      </Profile>
      <Social>
        <a href="https://github.com/EmirYscn" target="_blank">
          <FaGithub />
        </a>
        <a href="https://github.com/EmirYscn" target="_blank">
          <FaLinkedin />
        </a>
        <a href="https://github.com/EmirYscn" target="_blank">
          <FaXTwitter />
        </a>
      </Social>
    </StyledPostUserCard>
  );
}

export default PostUserCard;
