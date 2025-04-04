import { useQuery } from "@tanstack/react-query";
import { getAuthorPosts } from "../services/apiPost";
import { useSearchParams } from "react-router";

export const useAuthorPosts = () => {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("s") || "";
  const tag = searchParams.get("tag") || "all";
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { posts, count } = { posts: [], count: 0 },
    error,
  } = useQuery({
    queryKey: ["posts", "archive", search, tag, page],
    queryFn: () => getAuthorPosts({ search, tag, page }),
  });

  return { isLoading, posts, count, error };
};
