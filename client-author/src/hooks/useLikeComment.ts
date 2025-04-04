import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

import { useUser } from "./useUser";
import { likeComment as likeApi } from "../services/apiLike";

export function useLikeComment() {
  const { postId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  const { mutate: like, isPending: isLoading } = useMutation({
    mutationFn: async (commentId: string) => {
      if (!isAuthenticated) {
        toast.error("You must be logged in to like posts.");
        navigate("/login"); // Redirect before returning
        return;
      }
      return likeApi(commentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", postId],
      });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { like, isLoading };
}
