import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup as signupApi } from "../services/apiAuth";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";

export function useSignup() {
  const navigate = useNavigate();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      navigate("/login");
      toast.success("Account successfully created!");
    },
    onError: (err) => {
      const axiosError = err as AxiosError<{ error: { msg: string }[] }>;
      const errArr = axiosError.response?.data.error.map((err) => err.msg) || [
        "An unexpected error occured",
      ];
      console.log("Error", errArr);
      toast.error(errArr.join(", "));
    },
  });

  return { signup, isPending };
}
