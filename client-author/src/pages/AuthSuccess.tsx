import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router";

import Spinner from "../ui/Spinner";

function AuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return; // Prevent running twice
    effectRan.current = true;

    const encodedData = searchParams.get("data");
    if (encodedData) {
      try {
        const decodedData = JSON.parse(atob(encodedData));
        const { token, user, provider } = decodedData;

        // Store token in localStorage
        localStorage.setItem("jwt", token);

        // Update React Query cache with user data
        queryClient.setQueryData(["user"], user);

        // Show success message
        toast.success(`Successfully logged in with ${provider}`);
        // Redirect to dashboard
        // Navigate after success
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 300);
      } catch (error) {
        console.error("Failed to parse auth data", error);
        navigate("/login?error=invalid_data", { replace: true });
      }
    }
  }, [searchParams, navigate, queryClient]);
  return <Spinner />;
}

export default AuthSuccess;
