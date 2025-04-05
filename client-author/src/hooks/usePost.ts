import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import { getPost } from "../services/apiPost";

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
