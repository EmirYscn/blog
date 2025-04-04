import Button from "../ui/Button";
import Form from "../ui/Form";
import Input from "./Input";
import FormRowVertical from "../ui/FormRowVertical";
import SpinnerMini from "../ui/SpinnerMini";

import { useForm } from "react-hook-form";
import { SignupType } from "../services/apiAuth";
import { useDarkMode } from "../contexts/DarkMode/ThemeContextProvider";
import { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { useForgotPassword } from "../hooks/useForgotPassword";

function ResetPasswordFormEmail() {
  const { isDarkMode } = useDarkMode();
  const [hasEmailSent, setHasEmailSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupType>();
  const { forgot, isLoading } = useForgotPassword();

  function onSubmit(data: SignupType) {
    const { email } = data;
    forgot(email, {
      onSuccess: () => {
        setHasEmailSent(true);
      },
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} $isDarkMode={isDarkMode}>
      <FormRowVertical label="Email address" formError={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRowVertical>

      <FormRowVertical>
        {!hasEmailSent ? (
          <Button type="submit" size="medium" variation="primary">
            {!isLoading ? "Send verification email" : <SpinnerMini />}
          </Button>
        ) : (
          <Button
            type="submit"
            size="medium"
            variation="primary"
            disabled
            icon={<IoMdCheckmark />}
          >
            Email sent
          </Button>
        )}
      </FormRowVertical>
    </Form>
  );
}

export default ResetPasswordFormEmail;
