import Button from "../ui/Button";
import Form from "../ui/Form";
import Input from "./Input";
import FormRowVertical from "../ui/FormRowVertical";
import SpinnerMini from "../ui/SpinnerMini";

import { useSignup } from "../hooks/useSignup";
import { useForm } from "react-hook-form";
import { SignupType } from "../services/apiAuth";
import { useDarkMode } from "../contexts/DarkMode/ThemeContextProvider";

function SignupForm() {
  const { isDarkMode } = useDarkMode();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<SignupType>();
  const { signup, isPending } = useSignup();

  function onSubmit({ email, username, password }: SignupType) {
    signup(
      { email, username, password },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} $isDarkMode={isDarkMode}>
      <FormRowVertical label="Email address" formError={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          disabled={isPending}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical label="Username" formError={errors?.username?.message}>
        <Input
          type="username"
          id="username"
          // This makes this form better for password managers
          autoComplete="username"
          disabled={isPending}
          {...register("username", { required: "This field is required" })}
        />
      </FormRowVertical>

      <FormRowVertical label="Password" formError={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isPending}
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
          disabled={isPending}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button type="submit" size="medium" variation="primary">
          {!isPending ? "Sign up" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default SignupForm;
