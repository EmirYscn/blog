import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { MouseEvent, UpdateUser } from "../types/types";

import { useUser } from "../hooks/useUser";
import { useProfile } from "../hooks/useProfile";
import { useUpdateProfile } from "../hooks/useUpdateProfile";

import Input from "./Input";
import FormRow from "./FormRow";
import Form from "./Form";
import Button from "./Button";

const StyledSettings = styled.div`
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

const BioInput = styled.textarea`
  background-color: var(--color-grey-50);
  padding: 1rem;
  border: 1px solid var(--color-grey-200);
  border-radius: 8px;
  resize: none;

  min-height: 100px;
  transition: border 0.2s ease-in-out;
  overflow: auto;

  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
  }
`;

type UpdateProfile = UpdateUser;

function ProfileSettings() {
  const { user } = useUser();
  const { profile } = useProfile(user?.id);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<UpdateProfile>();

  const [isEdited, setIsEdited] = useState(false);
  const { update, isLoading: isUpdating } = useUpdateProfile();

  useEffect(() => {
    if (user) {
      setValue("email", user.email || "");
      setValue("username", user.username || "");
      setValue("bio", profile?.bio || "");
    }
  }, [user, setValue, profile]);

  async function onSubmit() {
    if (!user) return;

    // Get latest form values
    const formValues = getValues();

    // Create an object to track the original values
    const originalValues = {
      email: user.email || "",
      username: user.username || "",
      bio: profile?.bio || "",
    };

    // Create an empty object for updated fields
    const updatedFields: Partial<UpdateProfile> = {};

    // Compare each field and add to updatedFields only if changed
    if (formValues.email !== originalValues.email) {
      updatedFields.email = formValues.email;
    }

    if (formValues.username !== originalValues.username) {
      updatedFields.username = formValues.username;
    }

    if (formValues.bio !== originalValues.bio) {
      updatedFields.bio = formValues.bio;
    }

    if (Object.keys(updatedFields).length === 0) {
      console.log("No changes detected.");
      return;
    }

    update(updatedFields, { onSuccess: () => setIsEdited(false) });
  }

  function handleReset(e: MouseEvent) {
    e.preventDefault();
    reset({
      email: user?.email || "",
      username: user?.username || "",
      bio: profile?.bio || "",
    });
    setIsEdited(false);
  }

  return (
    <StyledSettings>
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormRow label="Email" formError={errors?.email?.message}>
            <Input
              type="text"
              id="email"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Please enter a valid email",
                },
              })}
              onChange={() => setIsEdited(true)}
            />
          </FormRow>
          <FormRow label="Username" formError={errors?.username?.message}>
            <Input
              type="text"
              id="username"
              {...register("username", {
                required: "This field is required",
                minLength: {
                  value: 2,
                  message: "Username must be at least 3 characters long",
                },
                maxLength: {
                  value: 20,
                  message: "Username must be at most 20 characters long",
                },
              })}
              onChange={() => setIsEdited(true)}
            />
          </FormRow>
          <FormRow label="Bio" formError={errors?.bio?.message}>
            <BioInput
              id="bio"
              {...register("bio", {
                maxLength: {
                  value: 200,
                  message: "bio must be at most 200 characters long",
                },
              })}
              onChange={() => setIsEdited(true)}
            />
          </FormRow>

          <FormRow>
            <Button
              onClick={(e: MouseEvent) => handleReset(e)}
              variation="danger"
              disabled={isUpdating || !isEdited}
            >
              Reset
            </Button>
            <Button
              type="submit"
              variation="primary"
              disabled={isUpdating || !isEdited}
            >
              Save settings
            </Button>
          </FormRow>
        </Form>
      </FormContainer>
    </StyledSettings>
  );
}

export default ProfileSettings;
