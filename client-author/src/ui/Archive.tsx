import styled from "styled-components";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import { useState } from "react";

import { useAuthorPosts } from "../hooks/useAuthorPosts";

import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import Filter from "./Filter";
import Spinner from "./Spinner";
import ScrollToTop from "./ScrollToTop";
import Button from "./Button";
import Posts from "./Posts";

const StyledArchive = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

function Archive() {
  const [show, setShow] = useState(true);
  const { posts, count, isLoading } = useAuthorPosts();

  if (isLoading) return <Spinner />;

  if (posts?.length === 0) return null;

  return (
    <StyledArchive>
      <Top>
        <h2>Archive</h2>
        <Button
          icon={
            show ? (
              <MdOutlineKeyboardArrowLeft />
            ) : (
              <MdOutlineKeyboardArrowDown />
            )
          }
          onClick={() => setShow((prev) => !prev)}
        />
      </Top>
      {show && (
        <>
          <ScrollToTop />
          <SearchBar navigateTo="archive" />
          <Filter
            filterField="tag"
            navigateTo="archive"
            options={[
              { value: "all", label: "All" },
              { value: "api-design", label: "API Design" },
              { value: "design-patterns", label: "Design Patterns" },
              { value: "system-design", label: "System Design" },
              { value: "databases", label: "Databases" },
            ]}
          />

          <Posts posts={posts} />

          {count > 0 && <Pagination count={count} navigateTo="archive" />}
        </>
      )}
    </StyledArchive>
  );
}

export default Archive;
