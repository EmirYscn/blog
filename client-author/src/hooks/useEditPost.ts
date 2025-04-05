import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import toast from "react-hot-toast";

import { Post } from "../types/types";

import { updatePost } from "../services/apiPost";

export function useEditPost() {
  const { postId } = useParams();
  const queryClient = useQueryClient();

  const { mutate: edit, isPending: isLoading } = useMutation({
    mutationFn: async ({
      postId,
      body,
    }: {
      postId: string;
      body: Partial<Post>;
    }) => updatePost(postId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post", postId],
      });
      queryClient.invalidateQueries({
        queryKey: ["posts"],
        exact: false,
      });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { edit, isLoading };
}
