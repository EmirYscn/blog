import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import { getPublishedPosts } from "../services/apiPost";

export const usePublishedPosts = () => {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("s") || "";
  const tag = searchParams.get("tag") || "all";
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { posts: publishedPosts, count } = { publishedPosts: [], count: 0 },
    error,
  } = useQuery({
    queryKey: ["posts", "published", search, tag, page],
    queryFn: () => getPublishedPosts({ search, tag, page }),
  });

  return { isLoading, publishedPosts, count, error };
};
