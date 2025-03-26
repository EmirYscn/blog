import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getProfile } from "../services/apiUser";

export const useProfile = () => {
  const { profileId } = useParams();

  const {
    isLoading,
    data: profile,
    error,
  } = useQuery({
    queryKey: ["profile", profileId],
    queryFn: () => getProfile(profileId!),
    retry: false,
  });

  return { isLoading, profile, error };
};
