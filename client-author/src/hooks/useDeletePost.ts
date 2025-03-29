import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deletePost as deletePostApi } from "../services/apiPost";

export function useDeletePost() {
  const queryClient = useQueryClient();

  const { mutate: deletePost, isPending: isLoading } = useMutation({
    mutationFn: (postId: string) => deletePostApi(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["featuredPosts"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["archivePosts"],
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

  return { deletePost, isLoading };
}
