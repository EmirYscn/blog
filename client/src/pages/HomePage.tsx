import styled from "styled-components";
import Home from "../ui/Home";

const StyledHome = styled.div``;

function HomePage() {
  const params = new URLSearchParams(window.location.search);
  const encodedData = params.get("data");

  if (encodedData) {
    const decodedData = JSON.parse(atob(encodedData)); // Decode Base64
    console.log("Token:", decodedData.token);
    console.log("User:", decodedData.user);

    // Save token to localStorage or cookies
    localStorage.setItem("jwt", decodedData.token);
  }

  return (
    <StyledHome>
      <Home />
    </StyledHome>
  );
}

export default HomePage;
