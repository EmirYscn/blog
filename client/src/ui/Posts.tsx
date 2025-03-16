import styled from "styled-components";
import ProfileImage from "./ProfileImage";
import Button from "./Button";
import { LuHeart } from "react-icons/lu";
import { FaRegCommentDots } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";
import PostMenus from "./PostMenus";
import { formatPostDate } from "../utils/formatPostDate";
import { usePosts } from "../hooks/usePosts";
import Spinner from "./Spinner";
import { Link } from "react-router";

const StyledPosts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: 50%;
  margin: 0 auto;
  height: 100%;
  padding: 1rem;
  align-items: center;
`;

const PostCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 80%;
  min-width: 400px;
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  padding: 3rem;
  /* border: 1px solid var(--color-brand-200); */
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;

const PostDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.5rem;
`;

const Title = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  /* justify-content: space-between; */
  /* padding-bottom: 1rem; */
`;

const Content = styled.div``;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CommentBox = styled.textarea`
  width: 100%;
  height: 40px;
  /* height: min-content; */
  /* height: auto; */

  padding: 1rem 1.2rem;
  border: 2px solid var(--color-brand-200);
  border-radius: 100px;
  font-size: 1.4rem;
  resize: none;
  outline: none;
  background: var(--color-grey-50);
  transition: all 0.3s ease;

  &:focus {
    border-color: var(--color-brand-500);
    background: var(--color-grey-50);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
`;

const AuthorLink = styled(Link)`
  &:hover {
    text-decoration: underline;
  }
`;

const Comments = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
`;

function Posts() {
  const { posts } = usePosts();

  if (!posts) return <Spinner />;

  return (
    <StyledPosts>
      {posts.map((post) => (
        <PostCard key={post.id}>
          <PostDetail>
            <Author>
              <ProfileImage imgSrc={post.author?.avatar} size="sm" />
              <AuthorLink to={`profile/${post.author?.id}`}>
                {post.author?.username}
              </AuthorLink>
              <span>&#x2022;</span>
              <span>{formatPostDate(post.createdAt)}</span>
            </Author>
            <PostMenus postId={post.id} authorId={post.author!.id} />
          </PostDetail>
          <Title>
            <h3>{post.title}</h3>
          </Title>
          <Content>
            <p>{post.content}</p>
          </Content>
          <Actions>
            <Button icon={<LuHeart />} variation="iconWithText">
              <span>1,2K</span>
            </Button>
            <Button icon={<FaRegCommentDots />} variation="iconWithText">
              <span>16</span>
            </Button>
            <Button icon={<RiShareForwardLine />} variation="iconWithText">
              <span>Share</span>
            </Button>
          </Actions>
          <CommentBox placeholder="Comment..." />
          <Comments>
            {post.comments?.map((comment) => (
              <Comment key={comment.id}>
                <AuthorLink to={`profile/${comment?.author?.id}`}>
                  {comment.author?.username}
                </AuthorLink>
                <span>{comment.content}</span>
              </Comment>
            ))}
          </Comments>
        </PostCard>
      ))}
    </StyledPosts>
  );
}

export default Posts;
