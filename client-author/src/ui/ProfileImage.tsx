import styled, { css } from "styled-components";

const sizes = {
  sm: "3rem",
  md: "5rem",
  lg: "10rem",
};

const StyledProfileImage = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`;

const ImageWrapper = styled.div<{
  size?: "sm" | "md" | "lg";
}>`
  position: relative;
  width: ${({ size }) => (size ? sizes[size] : "10rem")};
  height: ${({ size }) => (size ? sizes[size] : "10rem")};
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  transition: filter 0.3s ease-in-out;
`;

type ProfileImageProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  imgSrc: string | undefined | null;
  size?: "sm" | "md" | "lg";
  context?: "header" | "settings";
};

const OverlayText = styled.div<{ context?: "header" | "settings" }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Dark overlay */
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  ${ImageWrapper}:hover & {
    opacity: 1; /* Show on hover */
  }

  ${(props) =>
    props.context === "header" &&
    css`
      /* Hide overlay for 'header' context */
      opacity: 0 !important;
    `}
`;

function ProfileImage({
  imgSrc,
  size,
  children,
  context,
  onClick,
}: ProfileImageProps) {
  if (context === "settings") {
    return (
      <StyledProfileImage>
        <ImageWrapper size={size} onClick={onClick}>
          <Image src={imgSrc || "/default-profile-icon.png"} />
          <OverlayText context={context}>Change</OverlayText>
        </ImageWrapper>
        {children}
      </StyledProfileImage>
    );
  }

  return (
    <StyledProfileImage>
      <ImageWrapper size={size}>
        <Image src={imgSrc || "/default-profile-icon.png"} />
      </ImageWrapper>
    </StyledProfileImage>
  );
}

export default ProfileImage;
