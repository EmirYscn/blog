import styled from "styled-components";

import { useFeaturedAuthorPosts } from "../hooks/useFeaturedAuthorPosts";
import Spinner from "./Spinner";

import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import ScrollToTop from "./ScrollToTop";
import Filter from "./Filter";
import Posts from "./Posts";

const StyledFeaturedPosts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function FeaturedPosts() {
  const { featuredPosts, count, isLoading } = useFeaturedAuthorPosts();

  if (isLoading) return <Spinner />;

  return (
    <StyledFeaturedPosts>
      <h2>Featured Posts</h2>
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
    </StyledFeaturedPosts>
  );
}

export default FeaturedPosts;
