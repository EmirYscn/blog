import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createPost as createPostApi } from "../services/apiPost";
import { Post } from "../types/types";

export function useCreatePost() {
  const queryClient = useQueryClient();

  const { mutate: createPost, isPending: isLoading } = useMutation({
    mutationFn: (postData: Partial<Post>) => createPostApi(postData),
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

  return { createPost, isLoading };
}
