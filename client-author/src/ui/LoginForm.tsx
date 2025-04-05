import { useState } from "react";
import { Link } from "react-router";

import { FormEvent } from "../types/types";

import { useLogin } from "../hooks/useLogin";
import { useDarkMode } from "../contexts/DarkMode/ThemeContextProvider";

import Button from "./Button";
import Form from "./Form";
import Input from "./Input";
import FormRowVertical from "./FormRowVertical";
import SpinnerMini from "./SpinnerMini";
import GoogleButton from "./GoogleButton";
import GitHubButton from "./GithubButton";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending } = useLogin();
  const { isDarkMode } = useDarkMode();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit} $isDarkMode={isDarkMode}>
      <FormRowVertical label="Email">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />
      </FormRowVertical>

      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
        />
      </FormRowVertical>
      <Link to="/forgotPassword">Forgot Password?</Link>
      <FormRowVertical>
        <GoogleButton />
        <GitHubButton />
      </FormRowVertical>

      <FormRowVertical>
        <Button type="submit" size="medium" variation="primary">
          {!isPending ? "Log in" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
