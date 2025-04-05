import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

import { resetPassword as resetPasswordApi } from "../services/apiUser";

export function useResetPassword() {
  const navigate = useNavigate();

  const { mutate: resetPassword, isPending: isLoading } = useMutation({
    mutationFn: async ({
      token,
      password,
    }: {
      token: string;
      password: string;
    }) => resetPasswordApi(token, password),
    onSuccess: () => {
      toast.success("Password updated successfully");
      navigate("/login");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { resetPassword, isLoading };
}
