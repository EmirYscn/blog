import { Link } from "react-router";
import styled from "styled-components";
import { formatString } from "../utils/formatString";

const StyledNavInfo = styled.div`
  font-size: 1.3rem;
  opacity: 0.7;

  & ul {
    display: flex;
    gap: 0.4rem;

    & li {
      display: flex;
      align-items: center;
      /* gap: 0.4rem; */
    }
  }
`;

const StyledLink = styled(Link)`
  &:hover {
    text-decoration: underline;
  }
`;

const PostTitle = styled.span`
  font-weight: bold;
`;

function NavInfo({ postTitle }: { postTitle: string | undefined }) {
  return (
    <StyledNavInfo>
      <ul>
        <li>
          <StyledLink to="/">Backend Weekly</StyledLink>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            data-slot="icon"
            height="14px"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            ></path>
          </svg>
        </li>

        <li>
          <span>Posts</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            data-slot="icon"
            height="14px"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            ></path>
          </svg>
        </li>

        <li>
          <PostTitle>{formatString(postTitle!, 60)}</PostTitle>
        </li>
      </ul>
    </StyledNavInfo>
  );
}

export default NavInfo;
