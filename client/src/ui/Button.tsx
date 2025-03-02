import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  create: css`
    background-color: var(--color-brand-600);
    color: var(--color-grey-50);
    border-radius: 100px;

    & svg {
      height: 1.6rem;
      width: auto;
    }
  `,
  primary: css`
    color: var(--color-grey-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
  icon: css`
    border-radius: 50%;
    padding: 1rem;
  `,
  login: css`
    border-radius: 6px;

    &:hover {
      color: var(--color-brand-600);
    }
  `,
  logout: css`
    border-radius: 6px;

    &:hover {
      color: var(--color-brand-600);
    }
  `,
  iconWithText: css`
    border-radius: 6px;

    &:hover {
      color: var(--color-brand-600);
    }

    &:focus {
      outline: none;
    }
  `,
};

type ButtonProps = {
  size?: "small" | "medium" | "large";
  variation?:
    | "primary"
    | "secondary"
    | "danger"
    | "create"
    | "icon"
    | "login"
    | "logout"
    | "iconWithText";
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
};

const StyledButton = styled.button<ButtonProps>`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  background: none;
  display: flex;
  align-items: center;
  gap: 0.2rem;

  ${(props) => props.size && sizes[props.size]}
  ${(props) => props.variation && variations[props.variation]}
`;

function Button({
  size = "medium",
  variation = "icon",
  icon,
  children,
  onClick,
}: ButtonProps) {
  return (
    <StyledButton size={size} variation={variation} onClick={onClick}>
      {icon}
      {children}
    </StyledButton>
  );
}

export default Button;
