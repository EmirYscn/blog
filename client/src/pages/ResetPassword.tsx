import styled from "styled-components";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import ResetPasswordFormPassword from "../ui/ResetPasswordFormPassword";

const SignupLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
  color: var(--color-grey-900);
`;

function ResetPassword() {
  return (
    <SignupLayout>
      <Logo />
      <Heading as="h4">Reset your password</Heading>
      <ResetPasswordFormPassword />
    </SignupLayout>
  );
}

export default ResetPassword;
