import styled from "styled-components";

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

function ProfileImage({ imgSrc, size }: ProfileImageProps) {
  const imageSrc = imgSrc
    ? `${imgSrc}?timestamp=${Date.now()}`
    : "/default-profile-icon.png";

  return (
    <StyledProfileImage>
      <ImageWrapper size={size}>
        {/* <Image src={imageSrc} /> */}
        <Image src={imgSrc || "/default-profile-icon.png"} />
        {/* src={`${imgSrc}?timestamp=${new Date().getTime()}`} */}
      </ImageWrapper>
    </StyledProfileImage>
  );
}

export default ProfileImage;
