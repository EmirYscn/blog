import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router";
import { getPostComments } from "../services/apiComment";
// import { Comment as CommentType } from "../types/types";

export const useComments = () => {
  // const [searchParams] = useSearchParams();
  const { postId } = useParams();

  //   const search = searchParams.get("s") || "";
  //   const tag = searchParams.get("tag") || "all";
  //   const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

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
