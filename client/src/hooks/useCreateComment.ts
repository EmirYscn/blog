import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import { createComment } from "../services/apiComment";

function useCreateComment() {
  const queryClient = useQueryClient();
  const { postId } = useParams();

  const { mutate: comment, isPending: isLoading } = useMutation({
    mutationFn: async (comment: string) => {
      if (!postId) {
        toast.error("Post ID is missing.");
        return;
      }

      return createComment(postId!, comment);
    },
    onSuccess: () => {
      toast.success("Commented successfully!");
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { comment, isLoading };
}

export default useCreateComment;
