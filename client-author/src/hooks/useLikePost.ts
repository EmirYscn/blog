import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useUser } from "./useUser";
import { likePost as likeApi } from "../services/apiLike";

export function useLikePost() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  const { mutate: like, isPending: isLoading } = useMutation({
    mutationFn: async (postId: string) => {
      if (!isAuthenticated) {
        toast.error("You must be logged in to like posts.");
        navigate("/login"); // Redirect before returning
        return;
      }
      return likeApi(postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["featuredPosts"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["archivePosts"],
        exact: false,
      });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { like, isLoading };
}
