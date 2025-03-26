import { Profile, User } from "../types/types";
import { api } from "./apiAuth";

export const getAuthor = async (): Promise<User> => {
  try {
    const res = await api.get("/api/v1/users/author");
    console.log(res.data.author);
    return res.data.author; // Axios automatically parses JSON
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't fetch author");
  }
};

export const getProfile = async (profileId: string): Promise<Profile> => {
  try {
    const res = await api.get(`/api/v1/users/profile/${profileId}`);

    return res.data.profile;
  } catch (error) {
    console.error("Profile fetch error:", error);
    throw new Error("Couldn't fetch profile");
  }
};
