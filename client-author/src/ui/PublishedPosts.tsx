import styled from "styled-components";

import Spinner from "./Spinner";

import { usePublishedPosts } from "../hooks/usePublishedPosts";
import Pagination from "./Pagination";
import ScrollToTop from "./ScrollToTop";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import { useState } from "react";
import Button from "./Button";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import Posts from "./Posts";

const StyledPublishedPosts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

function PublishedPosts() {
  const [show, setShow] = useState(true);
  const { publishedPosts, isLoading, count } = usePublishedPosts();

  if (isLoading) return <Spinner />;

  return (
    <StyledPublishedPosts>
      <Top>
        <h2>Published Posts</h2>
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
          <SearchBar navigateTo="published" />
          <Filter
            filterField="tag"
            navigateTo="published"
            options={[
              { value: "all", label: "All" },
              { value: "api-design", label: "API Design" },
              { value: "design-patterns", label: "Design Patterns" },
              { value: "system-design", label: "System Design" },
              { value: "databases", label: "Databases" },
            ]}
          />
          <Posts posts={publishedPosts!} />
          {count > 0 && <Pagination count={count} navigateTo="published" />}
        </>
      )}
    </StyledPublishedPosts>
  );
}

export default PublishedPosts;
