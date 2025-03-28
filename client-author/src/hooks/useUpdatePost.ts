import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Post } from "../types/types";
import { updatePost } from "../services/apiPost";

export function useUpdatePost() {
  const queryClient = useQueryClient();

  const { mutate: update, isPending: isLoading } = useMutation({
    mutationFn: async ({
      postId,
      body,
    }: {
      postId: string;
      body: Partial<Post>;
    }) => updatePost(postId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["featuredPosts"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["authorPosts"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["publishedPosts"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["unpublishedPosts"],
        exact: false,
      });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { update, isLoading };
}
