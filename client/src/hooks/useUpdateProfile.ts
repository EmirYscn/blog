import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { UpdateUser } from "../types/types";
import { updateProfile } from "../services/apiUser";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  const { mutate: update, isPending: isLoading } = useMutation({
    mutationFn: async (body: Partial<UpdateUser>) => updateProfile(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["profile"],
        exact: false,
      });

      toast.success("Profile updated successfully!");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { update, isLoading };
}
