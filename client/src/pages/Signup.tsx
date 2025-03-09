import styled from "styled-components";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import SignupForm from "../ui/SignupForm";
import { useDarkMode } from "../contexts/DarkMode/ThemeContextProvider";

const SignupLayout = styled.main<{ $isDarkMode?: boolean }>`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
  color: var(--color-grey-900);
  /* background-color: ${(props) =>
    props.$isDarkMode ? "var(--color-black-200)" : "var(--color-grey-50)"};
  color: ${(props) =>
    props.$isDarkMode ? "var(--color-grey-50)" : "var(--color-black-200)"}; */
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
