import axios from "axios";
import { User } from "../types/types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

// Create axios instance with base URL
export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export type LoginCredentials = {
  email: string;
  password: string;
};

export type SignupType = {
  email: string;
  username: string;
  password: string;
  passwordConfirm?: string;
};

export const getCurrentUser = async (): Promise<User> => {
  try {
    const res = await api.get("/api/v1/auth/getCurrentUser");
    return res.data.user;
  } catch (error) {
    // If the token is invalid or expired, clear it
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem("jwt");
    }
    throw error;
  }
};

export const signup = async (data: SignupType) => {
  try {
    const res = await api.post("/api/v1/auth/signup", data);
    return res.data;
  } catch (error) {
    // Extract error message from response
    if (axios.isAxiosError(error)) {
      const serverMessage = error.response?.data?.message || "Couldn't signup";
      throw new Error(serverMessage);
    }

    throw new Error("An unexpected error occurred.");
  }
};

export const login = async (data: LoginCredentials): Promise<User> => {
  try {
    const res = await api.post("/api/v1/auth/login", data);
    localStorage.setItem("jwt", res.data.token);
    return res.data.user;
  } catch (error) {
    // Extract error message from response
    if (axios.isAxiosError(error)) {
      const serverMessage = error.response?.data?.message || "Couldn't login";
      throw new Error(serverMessage);
    }

    throw new Error("An unexpected error occurred.");
  }
};

export const handleOAuthCallback = (): { user: User; token: string } | null => {
  // Get URL parameters
  const params = new URLSearchParams(window.location.search);
  const data = params.get("data");

  if (!data) return null;

  try {
    // Decode the base64 payload
    const decoded = JSON.parse(atob(data));

    if (!decoded.token || !decoded.user) {
      throw new Error("Invalid token or user data");
    }
    // Store JWT token
    localStorage.setItem("jwt", decoded.token);

    return {
      user: decoded.user,
      token: decoded.token,
    };
  } catch (error) {
    console.error("Failed to parse OAuth callback data", error);
    return null;
  }
};

export const logout = async (): Promise<void> => {
  return new Promise((resolve) => {
    localStorage.removeItem("jwt");
    resolve();
  });
};
