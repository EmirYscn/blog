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
        queryKey: ["posts"],
        exact: false,
      });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { createPost, isLoading };
}
