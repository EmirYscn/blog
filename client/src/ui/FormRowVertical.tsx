import { AxiosError } from "axios";
import { isValidElement } from "react";
import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const FormError = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);

  grid-column: 2 / -1;
  text-align: end;
`;

const ApiError = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
  grid-column: 2 / -1;
  text-align: end;
`;

type FormRowProps = {
  label?: string;
  apiError?: string | AxiosError;
  formError?: string;
  children: React.ReactNode;
};

function FormRowVertical({
  label,
  apiError,
  formError,
  children,
}: FormRowProps) {
  const childElement = isValidElement<{ id?: string }>(children)
    ? children
    : null;
  const childId = childElement?.props?.id;

  const apiErrorMessage =
    typeof apiError === "string"
      ? apiError
      : (
          apiError as AxiosError<{ error: { msg: string }[] }>
        )?.response?.data?.error
          ?.map((err) => err.msg)
          .join(", ") || "An unexpected error occurred";

  return (
    <StyledFormRow>
      {apiError && <FormError>*{apiErrorMessage}</FormError>}
      {label && <Label htmlFor={childId}>{label}</Label>}
      {children}
      {formError && <ApiError>{formError}</ApiError>}
    </StyledFormRow>
  );
}

export default FormRowVertical;
