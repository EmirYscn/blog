import styled from "styled-components";

const Tags = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.5rem 1rem;
  background-color: var(--color-brand-900);
  color: var(--color-white);
  border-radius: 30px;
  font-size: 1.5rem;
`;

function PostTags({ tags }: { tags: string[] }) {
  const updatedTags = tags.map((tag) => {
    return tag
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  });
  return tags.length > 0 && <Tags>{updatedTags?.[0]}</Tags>;
}

export default PostTags;
