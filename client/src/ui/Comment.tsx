import { useEffect, useRef, useState } from "react";
import { Comment as CommentType, ROLE } from "../types/types";
import { formatString } from "../utils/formatString";
import Button from "./Button";
import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router";
import ProfileImage from "./ProfileImage";
import { formatPostDate } from "../utils/formatPostDate";
import { LuHeart } from "react-icons/lu";
import { FaRegCommentDots } from "react-icons/fa6";
import Menus from "./Menus";
import { IoPerson } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { useUser } from "../hooks/useUser";
import useDeleteComment from "../hooks/useDeleteComment";

const StyledComment = styled.div<{ $isReply?: boolean }>`
  display: flex;
  gap: 1rem;
  position: relative;
  ${(props) =>
    props.$isReply &&
    css`
      margin-left: 0.5rem;
    `}
`;

const AuthorLink = styled(Link)`
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const Author = styled.div`
  display: flex;
  justify-content: space-between;
  /* gap: 1rem; */
`;

const Content = styled.span`
  margin: 0.5rem 0;
  max-width: 100%;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  display: block;
  white-space: normal;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;
const CurvedConnector = styled.div`
  position: absolute;
  top: 5px;
  left: -29.8px;
  width: 24px;
  height: 24px;
  overflow: visible;
  z-index: 1;
`;

const ProfileImageWrapper = styled.div<{ $isReply?: boolean }>`
  position: relative;
  align-self: flex-start;

  /* ${(props) =>
    props.$isReply &&
    css`
      &::before {
        content: "";
        position: absolute;
        top: 16px;
        left: -30px;
        width: 20px;
        height: 2px;
        background-color: var(--color-grey-300, #dee2e6);
      }
    `} */
`;

const VerticalLine = styled.div<{ $height: number }>`
  position: absolute;
  top: 40px; /* Adjust based on your avatar size */
  left: 16px; /* Center of the avatar, adjust as needed */
  width: 2px;
  height: ${(props) => `${props.$height}px`};
  background-color: var(--color-grey-300, #dee2e6);
  z-index: 0;
  transform: translateX(-50%);
`;

const RepliesContainer = styled.div`
  margin-top: 1rem;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CommentContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Details = styled.div`
  display: flex;
  gap: 1rem;
`;

function Comment({
  comment,
  isReply = false,
}: {
  comment: CommentType;
  isReply?: boolean;
}) {
  const { user } = useUser();
  const [lineHeight, setLineHeight] = useState(0);
  const profileRef = useRef<HTMLDivElement>(null);
  // const actionsRef = useRef<HTMLDivElement>(null);
  const contentEndRef = useRef<HTMLDivElement>(null);
  const { deleteComment, isLoading: isDeleting } = useDeleteComment();

  const [isExpanded, setIsExpanded] = useState(false);
  // Handle "Read more" toggle
  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    const calculateHeight = () => {
      if (profileRef.current && contentEndRef.current) {
        // Get the position of the profile image
        const profileRect = profileRef.current.getBoundingClientRect();
        // Get the position of the actions
        const contentEndRect = contentEndRef.current.getBoundingClientRect();

        // Calculate the distance between the bottom of profile and the bottom of actions
        const height = contentEndRect.bottom - profileRect.bottom + 12;

        setLineHeight(height); // Ensure a minimum height
      }
    };

    // Calculate on initial render
    calculateHeight();

    // Recalculate on window resize
    window.addEventListener("resize", calculateHeight);

    return () => {
      window.removeEventListener("resize", calculateHeight);
    };
  }, [comment, isExpanded]); // Recalculate when comment changes

  return (
    <StyledComment $isReply={isReply}>
      <ProfileImageWrapper ref={profileRef} $isReply={isReply}>
        {isReply && (
          <CurvedConnector>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              transform="scale(1, -1)"
            >
              <path
                d="M0,20 Q0,8 8,8 L24,8"
                stroke="var(--color-grey-300, #dee2e6)"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </CurvedConnector>
        )}
        <ProfileImage imgSrc={comment?.author?.avatar} size="sm" />
        {/* Only show vertical line if this comment has replies */}
        {comment.replies && comment.replies.length > 0 && (
          <VerticalLine $height={lineHeight} />
        )}
      </ProfileImageWrapper>
      <CommentContent>
        <Author>
          <Details>
            <AuthorLink to={`/profile/${comment.author?.id}`}>
              {comment.author?.username}
            </AuthorLink>
            <span>&#x2022;</span>
            <span>{formatPostDate(comment?.createdAt)}</span>
          </Details>
          {user?.role === "ADMIN" && (
            <Menus>
              <Menus.Menu>
                <Menus.Toggle id={comment.id} />
                <Menus.List id={comment!.id}>
                  <Menus.Button
                    icon={<FaRegTrashAlt />}
                    onClick={() => deleteComment(comment.id)}
                    disabled={isDeleting}
                  >
                    Delete
                  </Menus.Button>
                </Menus.List>
              </Menus.Menu>
            </Menus>
          )}
        </Author>
        <Content>
          {isExpanded ? (
            <span>{comment?.content}</span>
          ) : (
            <span>{formatString(comment?.content, 200)}</span>
          )}
          {comment?.content?.length > 200 && (
            <Button onClick={handleToggle} variation="readmore">
              {isExpanded ? "Show Less" : "Read More"}
            </Button>
          )}
        </Content>
        <Actions>
          <Button icon={<LuHeart />} variation="action">
            <span>{comment._count.likes}</span>
          </Button>
          <Button icon={<FaRegCommentDots />} variation="action">
            <span>{comment._count.replies}</span>
          </Button>
        </Actions>
        {/* This hidden div is used to measure the end of the comment content */}
        <div ref={contentEndRef}></div>
        {comment.replies && comment.replies.length > 0 && (
          <RepliesContainer>
            {comment.replies.map((reply) => (
              <Comment key={reply.id} comment={reply} isReply={true} />
            ))}
          </RepliesContainer>
        )}
      </CommentContent>
    </StyledComment>
  );
}

export default Comment;
