import styled from "styled-components";

const StyledGoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #fff;
  color: #3c4043;
  border: 1px solid #dadce0;
  border-radius: 4px;
  padding: 8px 16px;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 40px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s;

  &:hover {
    background-color: #f8f9fa;
    box-shadow: 0 1px 2px rgba(60, 64, 67, 0.3);
  }

  &:active {
    background-color: #f1f3f4;
  }
`;

// Google Logo SVG component
const GoogleIcon = () => (
  <svg
    width="18"
    height="18"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
  >
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
    />
    <path
      fill="#FBBC05"
      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
    />
    <path
      fill="#34A853"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
    />
  </svg>
);

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

function GoogleButton() {
  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/api/v1/auth/google`;
  };

  return (
    <StyledGoogleButton type="button" onClick={handleGoogleLogin}>
      <GoogleIcon />
      Continue with Google
    </StyledGoogleButton>
  );
}

export default GoogleButton;
