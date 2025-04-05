import axios from "axios";
import { Profile, UpdateUser, User } from "../types/types";
import { api } from "./apiAuth";

export const getAuthor = async (): Promise<User> => {
  try {
    const res = await api.get("/api/v1/users/author");

    return res.data.author; // Axios automatically parses JSON
  } catch (error: unknown) {
    throw new Error("Couldn't fetch author");
  }
};

export const getProfile = async (profileId: string): Promise<Profile> => {
  try {
    const res = await api.get(`/api/v1/users/profile/${profileId}`);

    return res.data.profile;
  } catch (error: unknown) {
    throw new Error("Couldn't fetch profile");
  }
};

export const updateProfile = async (body: Partial<UpdateUser>) => {
  try {
    await api.patch("/api/v1/users/updateProfile", body);
  } catch (error) {
    console.error("Update user error:", error);
    // Extract error message from response
    if (axios.isAxiosError(error)) {
      const serverMessage =
        error.response?.data?.message ||
        error.response?.data.error[0].msg ||
        "Couldn't update user";
      throw new Error(serverMessage);
    }

    throw new Error("An unexpected error occurred.");
  }
};

export const updatePassword = async (body: Partial<UpdateUser>) => {
  try {
    await api.patch("/api/v1/users/updatePassword", body);
  } catch (error) {
    console.error("Update user error:", error);
    // Extract error message from response
    if (axios.isAxiosError(error)) {
      const serverMessage =
        error.response?.data?.message ||
        error.response?.data.error[0].msg ||
        "Couldn't update user";
      throw new Error(serverMessage);
    }

    throw new Error("An unexpected error occurred.");
  }
};

export const forgotPassword = async (email: string) => {
  try {
    await api.post("/api/v1/users/forgotPassword", { email });
  } catch (error) {
    console.error("Forgot password error:", error);
    // Extract error message from response
    if (axios.isAxiosError(error)) {
      const serverMessage =
        error.response?.data?.message || "Couldn't send reset password email";
      throw new Error(serverMessage);
    }

    throw new Error("An unexpected error occurred.");
  }
};

export const resetPassword = async (token: string, password: string) => {
  try {
    const res = await api.patch(`/api/v1/users/resetPassword/${token}`, {
      password,
    });
    return res.data;
  } catch (error) {
    console.error("Reset password error:", error);
    // Extract error message from response
    if (axios.isAxiosError(error)) {
      const serverMessage =
        error.response?.data?.message || "Couldn't reset password";
      throw new Error(serverMessage);
    }

    throw new Error("An unexpected error occurred.");
  }
};
