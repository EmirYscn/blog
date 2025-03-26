import styled, { css } from "styled-components";
import { Link } from "react-router";
import { useDarkMode } from "../contexts/DarkMode/ThemeContextProvider";

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
  const { isDarkMode } = useDarkMode();

  const src = isDarkMode ? "/logo-dark.svg" : "/logo-light.svg";

  return (
    <StyledLogo>
      <Link to={"/"}>
        <Img src={src} alt="Logo" size={size} />
      </Link>
    </StyledLogo>
  );
}

export default Logo;
