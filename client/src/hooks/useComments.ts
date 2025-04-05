import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { getPostComments } from "../services/apiComment";

export const useComments = () => {
  const { postId } = useParams();

  const {
    isLoading,
    data: comments,
    error,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getPostComments(postId!),
  });

  return { isLoading, comments, error };
};
