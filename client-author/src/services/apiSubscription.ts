import axios from "axios";
import { api } from "./apiAuth";

export const subscribe = async (email: string) => {
  try {
    await api.post("/api/v1/subscribe", { email });
  } catch (error) {
    // Extract error message from response
    if (axios.isAxiosError(error)) {
      const serverMessage =
        error.response?.data?.message || "Couldn't subscribe";
      throw new Error(serverMessage);
    }

    throw new Error("An unexpected error occurred.");
  }
};
