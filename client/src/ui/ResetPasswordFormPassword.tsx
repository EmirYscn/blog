import Button from "../ui/Button";
import Form from "../ui/Form";
import Input from "./Input";
import FormRowVertical from "../ui/FormRowVertical";
import SpinnerMini from "../ui/SpinnerMini";

import { useForm } from "react-hook-form";
import { SignupType } from "../services/apiAuth";
import { useDarkMode } from "../contexts/DarkMode/ThemeContextProvider";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useResetPassword } from "../hooks/useResetPassword";

function ResetPasswordFormPassword() {
  const { isDarkMode } = useDarkMode();
  const [token, setToken] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignupType>();

  const { resetPassword, isLoading } = useResetPassword();

  useEffect(() => {
    if (searchParams.get("token")) {
      setToken(searchParams.get("token"));
    }
  }, [searchParams]);

  function onSubmit(data: SignupType) {
    const { password } = data;
    if (!token) return;
    // Call the reset password function with the token and new password
    resetPassword({ token, password });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} $isDarkMode={isDarkMode}>
      <FormRowVertical label="Password" formError={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical
        label="Confirm Password"
        formError={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button type="submit" size="medium" variation="primary">
          {!isLoading ? "Done" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default ResetPasswordFormPassword;
