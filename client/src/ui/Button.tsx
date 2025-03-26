import { subscribe } from "diagnostics_channel";
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
    color: var(--color-white);
    border-radius: 100px;

    & svg {
      height: 1.6rem;
      width: auto;
    }
  `,
  subscribe: css`
    background-color: var(--color-brand-600);
    color: var(--color-white);
    border: none;
    border-radius: 0 8px 8px 0;
  `,
  search: css`
    border: none;
    padding: 0.5rem;
    &:focus {
      outline: none;
    }

    &:hover {
      color: red;
    }
  `,
  tag: css`
    border: 2px solid;
    border-color: var(--color-brand-600);
    padding: 0.5rem 1rem;
    border-radius: 6px;
    transition: all 0.2s ease-in;

    &:hover {
      background-color: var(--color-brand-600);
      color: var(--color-white);
    }
    /* color: var(--color-white); */
  `,
  primary: css`
    background-color: var(--color-brand-600);
    color: var(--color-white);
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
    /* border-radius: 50%; */
    padding: 1rem;

    &:focus {
      outline: none;
    }
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
  normal: css`
    border-radius: 6px;

    &:hover {
      color: var(--color-brand-600);
    }
  `,
  action: css`
    border-radius: 6px;
    padding: 1rem 0;

    &:hover {
      color: var(--color-brand-600);
    }

    &:focus {
      outline: none;
    }
  `,
  readmore: css`
    border-radius: 6px;
    padding: 0;

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
    | "iconWithText"
    | "subscribe"
    | "tag"
    | "search"
    | "normal"
    | "action"
    | "readmore";
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const StyledButton = styled.button<ButtonProps>`
  border: none;
  border-radius: var(--border-radius-sm);
  /* box-shadow: var(--shadow-sm); */
  background: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-grey-900);

  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};

  ${(props) => props.size && sizes[props.size]}
  ${(props) => props.variation && variations[props.variation]}
`;

function Button({
  size = "medium",
  variation = "icon",
  icon,
  children,
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <StyledButton
      size={size}
      variation={variation}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {children}
    </StyledButton>
  );
}

export default Button;
