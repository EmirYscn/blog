import { useQuery } from "@tanstack/react-query";
import { getUnpublishedPosts } from "../services/apiPost";
import { useSearchParams } from "react-router";

export const useUnpublishedPosts = () => {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("s") || "";
  const tag = searchParams.get("tag") || "all";
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const {
    isLoading,
    data: { posts: unpublishedPosts, count } = {
      unpublishedPosts: [],
      count: 0,
    },
    error,
  } = useQuery({
    queryKey: ["posts", "unpublished", search, tag, page],
    queryFn: () => getUnpublishedPosts({ search, tag, page }),
  });

  return { isLoading, unpublishedPosts, count, error };
};
