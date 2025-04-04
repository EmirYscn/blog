import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { forgotPassword } from "../services/apiUser";

export function useForgotPassword() {
  const { mutate: forgot, isPending: isLoading } = useMutation({
    mutationFn: async (email: string) => forgotPassword(email),
    onSuccess: () => {
      toast.success("Check your email for reset password link");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { forgot, isLoading };
}
