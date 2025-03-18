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
  const res = await api.post("/api/v1/auth/signup", data);
  return res.data;
};

export const login = async (data: LoginCredentials): Promise<User> => {
  const res = await api.post("/api/v1/auth/login", data);
  localStorage.setItem("jwt", res.data.token);
  return res.data.user;
};

export const logout = async (): Promise<void> => {
  return new Promise((resolve) => {
    localStorage.removeItem("jwt");
    resolve(); // Ensures it returns a Promise<void>
  });
};
