import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import { handleOAuthCallback } from "../services/apiAuth";

const USER_QUERY_KEY = "user";

export function useOAuthCallback() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const processOAuth = async () => {
      try {
        setIsProcessing(true);

        const authResult = handleOAuthCallback();

        if (!authResult) {
          throw new Error("Invalid OAuth response");
        }

        // Store user in cache
        queryClient.setQueryData([USER_QUERY_KEY], authResult.user);

        // Clear query parameters from URL
        window.history.replaceState({}, document.title, "/");

        // Show success message
        toast.success("Successfully logged in with Google");

        // Navigate after success
        setTimeout(() => {
          setIsProcessing(false);
          navigate("/", { replace: true });
        }, 100);
      } catch (error) {
        toast.error("Login failed, please try again.");

        // Ensure state update before navigation
        setTimeout(() => {
          setIsProcessing(false);
          navigate("/login", { replace: true });
        }, 100);
      }
    };

    processOAuth();
  }, [queryClient, navigate]);

  return { isProcessing };
}
