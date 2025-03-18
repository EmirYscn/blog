import { useQuery } from "@tanstack/react-query";
import { getAuthor } from "../services/apiUser";

export const useAuthor = () => {
  const {
    isLoading,
    data: author,
    error,
  } = useQuery({
    queryKey: ["author"],
    queryFn: getAuthor,
  });

  return { isLoading, author, error };
};
