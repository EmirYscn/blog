import { useParams } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteComment as deleteCommentApi } from "../services/apiComment";

function useDeleteComment() {
  const queryClient = useQueryClient();
  const { postId } = useParams();

  const { mutate: deleteComment, isPending: isLoading } = useMutation({
    mutationFn: async (commentId: string) => deleteCommentApi(commentId),
    onSuccess: () => {
      toast.success("Comment deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { deleteComment, isLoading };
}

export default useDeleteComment;
