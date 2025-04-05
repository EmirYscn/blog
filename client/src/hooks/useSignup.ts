import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { signup as signupApi } from "../services/apiAuth";

export function useSignup() {
  const navigate = useNavigate();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      navigate("/login");
      toast.success("Account successfully created!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { signup, isPending };
}
