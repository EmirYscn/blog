import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { getProfile } from "../services/apiUser";

export const useProfile = (id?: string) => {
  const params = useParams();

  const profileId = id ?? params.profileId;

  const {
    isLoading,
    data: profile,
    error,
  } = useQuery({
    queryKey: ["profile", profileId],
    queryFn: () => {
      if (!profileId) throw new Error("No profile ID provided");
      return getProfile(profileId);
    },
    enabled: !!profileId,
    retry: false,
  });

  return { isLoading, profile, error };
};
