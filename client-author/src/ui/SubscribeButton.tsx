import styled from "styled-components";
import toast from "react-hot-toast";
import { useState } from "react";

import { useSubscribe } from "../hooks/useSubscribe";

import Input from "./Input";
import Button from "./Button";

const StyledSubscribeButton = styled.div`
  display: flex;
  justify-content: center;
`;

function SubscribeButton(props: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const { subscribe, isLoading } = useSubscribe();

  async function handleSubscribe() {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      toast.error("Please enter an email address.");
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Handle subscription and reset email on success
    subscribe(email, {
      onSuccess: () => {
        setEmail("");
      },
    });
  }

  return (
    <StyledSubscribeButton {...props}>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        type="text"
        style={{
          width: "300px",
          borderTopRightRadius: "0",
          borderBottomRightRadius: "0",
        }}
      />
      <Button
        variation="subscribe"
        disabled={isLoading}
        onClick={handleSubscribe}
      >
        {isLoading ? "Subscribing..." : "Subscribe"}
      </Button>
    </StyledSubscribeButton>
  );
}

export default SubscribeButton;
