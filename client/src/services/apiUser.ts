import { Profile } from "../types/types";
import { api } from "./apiAuth";

export const getProfile = async (profileId: string): Promise<Profile> => {
  console.log(profileId);
  try {
    const res = await api.get(`/api/v1/users/profile/${profileId}`);
    return res.data.profile;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't fetch profile");
  }
};
