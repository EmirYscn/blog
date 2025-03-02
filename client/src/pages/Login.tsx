import styled from "styled-components";
// import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import LoginForm from "../ui/LoginForm";
import { useDarkMode } from "../contexts/DarkMode/ThemeContextProvider";

const LoginLayout = styled.main<{ $isDarkMode?: boolean }>`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: ${(props) =>
    props.$isDarkMode ? "var(--color-black-200)" : "var(--color-grey-50)"};
  color: ${(props) =>
    props.$isDarkMode ? "var(--color-grey-50)" : "var(--color-black-200)"};
`;

function Login() {
  const { isDarkMode } = useDarkMode();
  return (
    <LoginLayout $isDarkMode={isDarkMode}>
      <Logo />
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
