import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

import { subscribe as subscribeApi } from "../services/apiSubscription";

export function useSubscribe() {
  const navigate = useNavigate();

  const { mutate: subscribe, isPending: isLoading } = useMutation({
    mutationFn: subscribeApi,
    onSuccess: () => {
      toast.success("Subscribed successfully!");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1000);
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { subscribe, isLoading };
}
