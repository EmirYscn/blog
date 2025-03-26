import { Link } from "react-router";
import { User } from "../types/types";
import styled from "styled-components";
import { formatPostDate } from "../utils/formatPostDate";
import Button from "./Button";
import { LuHeart } from "react-icons/lu";
import { FaRegCommentDots } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";
import { formatString } from "../utils/formatString";
import ProfileImage from "./ProfileImage";
import { useAuthor } from "../hooks/useAuthor";
import { useAuthorPosts } from "../hooks/useAuthorPosts";
import { useFeaturedAuthorPosts } from "../hooks/useFeaturedAuthorPosts";
import Spinner from "./Spinner";
import PostActions from "./PostActions";

const Posts = styled.div`
  margin-top: 3rem;
  /* padding: 2rem; */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 3rem;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  /* flex-direction: column; */
`;

const Post = styled.div`
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.2s ease-out;
  overflow: hidden; /* Ensures the image respects border-radius */

  &:hover {
    transform: scale(1.01);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1.9 / 1; /* Maintain aspect ratio */
  overflow: hidden; /* Ensures rounded corners */
  border-radius: 8px 8px 0 0; /* Rounded top corners only */
  display: flex;
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  display: block;
`;

const PostDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const Title = styled.span`
  font-size: 1.8rem;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostLikesComments = styled.div`
  display: flex;
  /* gap: 1rem; */
`;

const ContentPeek = styled.div``;

const StyledFeaturedPosts = styled.div``;

function FeaturedPosts() {
  const { featuredPosts, isLoading } = useFeaturedAuthorPosts();

  if (isLoading) return <Spinner />;

  return (
    <StyledFeaturedPosts>
      <h3>Featured Posts</h3>
      <Posts>
        {featuredPosts?.map((post) => (
          <Post key={post.id}>
            <Link to={`/post/${post.id}`}>
              <ImageWrapper>
                <Image src="/logo.jpg" />
              </ImageWrapper>
            </Link>

            <PostDetails>
              <Head>
                <span>{formatPostDate(post.createdAt)}</span>
                <PostActions post={post} />
              </Head>

              <Title>
                <Link to={`/post/${post.id}`}>
                  {formatString(post.title, 100)}
                </Link>
              </Title>
              <ContentPeek>{formatString(post.content!, 100)}</ContentPeek>
              <Author>
                <ProfileImage imgSrc={post.author?.avatar} size="sm" />
                <span>{post.author?.username}</span>
              </Author>
            </PostDetails>
          </Post>
        ))}
      </Posts>
    </StyledFeaturedPosts>
  );
}

export default FeaturedPosts;
