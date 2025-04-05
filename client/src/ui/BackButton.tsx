import { useNavigate } from "react-router";
import styled, { css } from "styled-components";
import { FaArrowCircleLeft } from "react-icons/fa";

const StyledBackButton = styled.button<{ poscontext?: string }>`
  padding: 0.5em 1em;
  border: none;
  border-radius: 6px;
  font-size: small;
  position: absolute;
  background: none;

  left: 13rem;
  top: 2rem;
  z-index: 1000;

  ${(props) =>
    props.poscontext === "settings" &&
    css`
      left: 3rem;
      top: 3rem;
    `}

  &:hover {
    background-color: #fffb09a0;
  }

  & svg {
    height: 2rem;
    width: auto;
  }
`;

type BackButtonProps = {
  posContext?: "post" | "settings";
  to?: string;
};

function BackButton({ posContext = "settings", to }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <StyledBackButton
      onClick={() => (to ? navigate(to) : navigate(-1))}
      poscontext={posContext}
    >
      <FaArrowCircleLeft />
    </StyledBackButton>
  );
}

export default BackButton;
