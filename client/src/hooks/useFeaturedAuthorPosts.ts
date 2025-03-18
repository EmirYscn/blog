import { useQuery } from "@tanstack/react-query";
import { getFeaturedPosts } from "../services/apiPost";

export const useFeaturedAuthorPosts = () => {
  const {
    isLoading,
    data: featuredPosts = [],
    error,
  } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: getFeaturedPosts,
  });

  return { isLoading, featuredPosts, error };
};
