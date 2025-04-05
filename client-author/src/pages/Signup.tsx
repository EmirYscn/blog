import styled from "styled-components";

import { useDarkMode } from "../contexts/DarkMode/ThemeContextProvider";

import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import SignupForm from "../ui/SignupForm";

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

function Signup() {
  const { isDarkMode } = useDarkMode();
  return (
    <SignupLayout $isDarkMode={isDarkMode}>
      <Logo />
      <Heading as="h4">Create an account</Heading>
      <SignupForm />
    </SignupLayout>
  );
}

export default Signup;
