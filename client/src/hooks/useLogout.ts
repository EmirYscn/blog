import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { logout as logoutApi } from "../services/apiAuth";

const USER_QUERY_KEY = "user";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.setQueryData([USER_QUERY_KEY], null);
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });

      navigate("/login", { replace: true });
    },
  });
  return { logout, isPending };
}
