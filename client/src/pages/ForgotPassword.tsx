import styled from "styled-components";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

import { useDarkMode } from "../contexts/DarkMode/ThemeContextProvider";
import ResetPasswordFormEmail from "../ui/ResetPasswordFormEmail";

const SignupLayout = styled.main<{ $isDarkMode?: boolean }>`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
  color: var(--color-grey-900);
`;

function ForgotPassword() {
  const { isDarkMode } = useDarkMode();
  return (
    <SignupLayout $isDarkMode={isDarkMode}>
      <Logo />
      <Heading as="h4">Confirmation email will be sent to this email</Heading>
      <ResetPasswordFormEmail />
    </SignupLayout>
  );
}

export default ForgotPassword;
