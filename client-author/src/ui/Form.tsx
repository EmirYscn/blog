import styled, { css } from "styled-components";

type FormProps = {
  type?: "regular" | "modal";
  $isDarkMode?: boolean;
};

const Form = styled.form<FormProps>`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;

      background-color: var(--color-grey-50);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
  padding: 1rem 2rem;

  & input {
    background-color: var(--color-grey-50);
    color: var(--color-grey-900);
  }
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
