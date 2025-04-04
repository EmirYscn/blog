import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { useUser } from "./useUser";
import { getUserPosts } from "../services/apiPost";

export const useUserPosts = () => {
  const [searchParams] = useSearchParams();
  const { user } = useUser();

  const search = searchParams.get("s") || "";
  const tag = searchParams.get("tag") || "all";
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { posts, count } = { posts: [], count: 0 },
    error,
  } = useQuery({
    queryKey: ["posts", "user", search, tag, page],
    queryFn: () => getUserPosts(user?.id, { search, tag, page }),
    enabled: !!user?.id,
  });

  return { isLoading, posts, count, error };
};
