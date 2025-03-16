import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { login as loginApi, LoginCredentials } from "../services/apiAuth";
import toast from "react-hot-toast";

// Key for user data in React Query cache
const USER_QUERY_KEY = "user";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ email, password }: LoginCredentials) =>
      loginApi({ email, password }),
    onSuccess: (user) => {
      // Update user in cache
      queryClient.setQueryData([USER_QUERY_KEY], user);

      navigate("/");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isPending, error };
}
