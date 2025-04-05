import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import { login as loginApi, LoginCredentials } from "../services/apiAuth";

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
      if (user.role !== "ADMIN") {
        toast.error("You are not authorized");

        queryClient.setQueryData([USER_QUERY_KEY], null);

        localStorage.removeItem("jwt");

        return navigate("/login");
      }

      queryClient.setQueryData([USER_QUERY_KEY], user);

      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { login, isPending, error };
}
