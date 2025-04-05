import styled from "styled-components";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import { useState } from "react";

import { useUnpublishedPosts } from "../hooks/useUnpublishedPosts";

import Spinner from "./Spinner";
import Pagination from "./Pagination";
import ScrollToTop from "./ScrollToTop";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import Button from "./Button";
import Posts from "./Posts";

const StyledUnpublishedPosts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

function UnpublishedPosts() {
  const [show, setShow] = useState(true);
  const { unpublishedPosts, count, isLoading } = useUnpublishedPosts();

  if (isLoading) return <Spinner />;

  return (
    <StyledUnpublishedPosts>
      <Top>
        <h2>Unpublished Posts</h2>
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
          <SearchBar navigateTo="unpublished" />
          <Filter
            filterField="tag"
            navigateTo="unpublished"
            options={[
              { value: "all", label: "All" },
              { value: "api-design", label: "API Design" },
              { value: "design-patterns", label: "Design Patterns" },
              { value: "system-design", label: "System Design" },
              { value: "databases", label: "Databases" },
            ]}
          />
          <Posts posts={unpublishedPosts!} />
          {count > 0 && <Pagination count={count} navigateTo="unpublished" />}
        </>
      )}
    </StyledUnpublishedPosts>
  );
}

export default UnpublishedPosts;
