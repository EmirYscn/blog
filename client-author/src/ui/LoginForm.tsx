import { useState } from "react";
import Button from "../ui/Button";
import Form from "../ui/Form";
import Input from "./Input";
import FormRowVertical from "../ui/FormRowVertical";
import SpinnerMini from "../ui/SpinnerMini";
import { FormEvent } from "../types/types";
import { useLogin } from "../hooks/useLogin";
import GoogleButton from "./GoogleButton";
import GitHubButton from "./GithubButton";
import { useDarkMode } from "../contexts/DarkMode/ThemeContextProvider";

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
          // This makes this form better for password managers
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

      <FormRowVertical>
        <GoogleButton />
        <GitHubButton />
      </FormRowVertical>

      <FormRowVertical>
        <Button size="medium" variation="primary">
          {!isPending ? "Log in" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
