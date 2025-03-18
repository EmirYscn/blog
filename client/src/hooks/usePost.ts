import { useQuery } from "@tanstack/react-query";
import { getPost } from "../services/apiPost";
import { useParams } from "react-router";

export const usePost = () => {
  const { postId } = useParams();

  const {
    isLoading,
    data: post,
    error,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId!),
  });

  return { isLoading, post, error };
};
