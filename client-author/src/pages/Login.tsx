import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import toast from "react-hot-toast";
import styled from "styled-components";

import { useDarkMode } from "../contexts/DarkMode/ThemeContextProvider";

import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import LoginForm from "../ui/LoginForm";

const LoginLayout = styled.main<{ $isDarkMode?: boolean }>`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
  color: var(--color-grey-900);
`;

function Login() {
  const { isDarkMode } = useDarkMode();
  const [searchParams] = useSearchParams();

  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return; // Prevent running twice
    effectRan.current = true;

    if (searchParams.get("error") === "unauthorized") {
      toast.error("You are not authorized");
    }
  }, [searchParams]);

  return (
    <LoginLayout $isDarkMode={isDarkMode}>
      <Logo />
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
