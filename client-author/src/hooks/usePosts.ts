import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../services/apiPost";

export const usePosts = () => {
  const {
    isLoading,
    data: posts,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return { isLoading, posts, error };
};
