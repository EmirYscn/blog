import styled, { css } from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";
import { Link } from "react-router";

const sizes = {
  sm: css`
    height: 5rem;
  `,
  md: css`
    height: 7rem;
  `,
  lg: css`
    height: 9.6rem;
  `,
};

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img<LogoProps>`
  height: 9.6rem;
  width: auto;

  ${(props) => props.size && sizes[props.size]}
`;

type LogoProps = {
  size?: "sm" | "md" | "lg";
};

function Logo({ size }: LogoProps) {
  // const { isDarkMode } = useDarkMode();

  // const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png";

  return (
    <StyledLogo>
      <Link to={"/"}>
        <Img src={"/logo.svg"} alt="Logo" size={size} />
      </Link>
    </StyledLogo>
  );
}

export default Logo;
