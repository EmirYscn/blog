import styled from "styled-components";

import { useFeaturedAuthorPosts } from "../hooks/useFeaturedAuthorPosts";
import Spinner from "./Spinner";

import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import ScrollToTop from "./ScrollToTop";
import Filter from "./Filter";
import { useState } from "react";
import Button from "./Button";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import Posts from "./Posts";

const StyledFeaturedPosts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

function FeaturedPosts() {
  const [show, setShow] = useState(true);
  const { featuredPosts, count, isLoading } = useFeaturedAuthorPosts();

  if (isLoading) return <Spinner />;

  return (
    <StyledFeaturedPosts>
      <Top>
        <h2>Featured Posts</h2>
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
          <SearchBar navigateTo="featured" />
          <Filter
            filterField="tag"
            navigateTo="featured"
            options={[
              { value: "all", label: "All" },
              { value: "api-design", label: "API Design" },
              { value: "design-patterns", label: "Design Patterns" },
              { value: "system-design", label: "System Design" },
              { value: "databases", label: "Databases" },
            ]}
          />
          <Posts posts={featuredPosts!} />
          {count > 0 && <Pagination count={count} navigateTo="featured" />}
        </>
      )}
    </StyledFeaturedPosts>
  );
}

export default FeaturedPosts;
