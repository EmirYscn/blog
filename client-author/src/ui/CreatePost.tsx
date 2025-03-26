import { useState } from "react";
import TextEditor from "./TextEditor";
import Button from "./Button";
import styled from "styled-components";
import { BiSave } from "react-icons/bi";

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 2rem;
// `;

const StyledCreatePost = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & > button {
    align-self: flex-end;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-self: flex-end;
  gap: 1rem;
`;

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();

  //     const postData = { content };

  //     const response = await fetch("http://localhost:3000/upload-image", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(postData),
  //     });

  //     if (response.ok) {
  //       console.log("Post saved successfully!");
  //     } else {
  //       console.error("Failed to save post.");
  //     }
  //   };

  return (
    <StyledCreatePost>
      <Button variation="primary" onClick={() => setShowEditor(!showEditor)}>
        {showEditor ? "Hide Editor" : "Create Post"}
      </Button>

      {showEditor && (
        <>
          <ButtonContainer>
            <Button
              icon={<BiSave />}
              variation="saveDraft"
              //   onClick={handleSubmit}
            >
              Save Draft
            </Button>
            <Button variation="publish">Publish</Button>
          </ButtonContainer>

          <TextEditor content={content} setContent={setContent} />
        </>
      )}
    </StyledCreatePost>
  );
};

export default CreatePost;
//   {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
