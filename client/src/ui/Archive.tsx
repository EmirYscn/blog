import styled from "styled-components";

import { useAuthorPosts } from "../hooks/useAuthorPosts";

import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import Filter from "./Filter";
import Spinner from "./Spinner";
import ScrollToTop from "./ScrollToTop";
import Posts from "./Posts";

const StyledArchive = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function Archive() {
  const { posts, count, isLoading } = useAuthorPosts();

  if (isLoading) return <Spinner />;

  return (
    <StyledArchive>
      <h2>Archive</h2>
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
    </StyledArchive>
  );
}

export default Archive;
