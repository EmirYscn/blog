import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "../services/apiAuth";

const USER_QUERY_KEY = "user";

export const useUser = () => {
  const hasToken = !!localStorage.getItem("jwt");
  const query = useQuery({
    queryKey: [USER_QUERY_KEY],
    queryFn: getCurrentUser,
    enabled: hasToken,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return {
    user: query.data,
    isLoading: hasToken && query.isLoading,
    isError: query.isError,
    isAuthenticated: !!query.data,
  };
};
