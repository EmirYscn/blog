import { useQuery } from "@tanstack/react-query";
import { getFeaturedPosts } from "../services/apiPost";
import { useSearchParams } from "react-router";

export const useFeaturedAuthorPosts = () => {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("s") || "";
  const tag = searchParams.get("tag") || "all";
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { posts: featuredPosts, count } = { featuredPosts: [], count: 0 },
    error,
  } = useQuery({
    queryKey: ["posts", "featured", search, tag, page],
    queryFn: () => getFeaturedPosts({ search, tag, page }),
  });

  return { isLoading, featuredPosts, count, error };
};
