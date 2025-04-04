import { useForm } from "react-hook-form";
import styled from "styled-components";

import { useUser } from "../hooks/useUser";
import FormRow from "./FormRow";
import Input from "./Input";
import Button from "./Button";
import Form from "./Form";
import { useUpdatePassword } from "../hooks/useUpdatePassword";

const StyledPassword = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormContainer = styled.div`
  position: relative;

  background-color: var(--color-grey-50);

  width: 100%;

  & form {
    display: grid;
    gap: 1rem;
  }
`;

type PasswordData = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

function PasswordSettings() {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<PasswordData>();

  const { update, isLoading: isUpdating } = useUpdatePassword();

  async function onSubmit(data: PasswordData) {
    if (!user) return;
    const { currentPassword, password, confirmPassword } = data;
    const updatedFields = {
      currentPassword,
      password,
      confirmPassword,
    };
    update(updatedFields, {
      onSuccess: () => {
        handleReset();
      },
    });
  }

  function handleReset(e?: MouseEvent) {
    e?.preventDefault();
    reset({
      currentPassword: "",
      password: "",
      confirmPassword: "",
    });
  }

  return (
    <StyledPassword>
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormRow
            label="Current Password"
            formError={errors?.currentPassword?.message}
          >
            <Input
              type="password"
              id="currentPassword"
              {...register("currentPassword")}
            />
          </FormRow>
          <FormRow label="New password" formError={errors?.password?.message}>
            <Input
              type="password"
              id="password"
              {...register("password", {
                required: "This field is required",
                minLength: 8,
              })}
            />
          </FormRow>
          <FormRow
            label="Confirm new password"
            formError={errors?.confirmPassword?.message}
          >
            <Input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "This field is required",
                validate: (value) =>
                  value === getValues().password ||
                  "Password and Confirm Password must match",
              })}
            />
          </FormRow>

          <FormRow>
            <Button
              onClick={handleReset}
              variation="danger"
              disabled={isUpdating}
            >
              Reset
            </Button>
            <Button type="submit" variation="primary" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update Password"}
            </Button>
          </FormRow>
        </Form>
      </FormContainer>
    </StyledPassword>
  );
}

export default PasswordSettings;
