import { ProfileType, ProfileResponseSchema } from "../types/types";
import { api } from "./apiAuth";

export const getProfile = async (profileId: string): Promise<ProfileType> => {
  try {
    const res = await api.get(`/api/v1/users/profile/${profileId}`);
    console.log(res.data.profile);
    const result = ProfileResponseSchema.safeParse(res.data.profile);
    if (!result.success) {
      console.error("Profile validation error", result.error);
      throw new Error("Invalid profile payload from server");
    }

    return result.data;
    // return res.data.profile;
  } catch (error) {
    console.error("Profile fetch error:", error);
    throw new Error("Couldn't fetch profile");
  }
};
