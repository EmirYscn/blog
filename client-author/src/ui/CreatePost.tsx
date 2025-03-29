import { useState } from "react";
import TextEditor from "./TextEditor";
import Button from "./Button";
import styled from "styled-components";
import { BiSave } from "react-icons/bi";
import { useCreatePost } from "../hooks/useCreatePost";
import { Post } from "../types/types";
import toast from "react-hot-toast";
import Input from "./Input";

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
const Label = styled.label`
  font-weight: bold;
  font-size: 2rem;
`;

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const { createPost, isLoading: isCreating } = useCreatePost();

  const handlePostPublish = async (flagPublished: boolean) => {
    if (!title) return;
    if (!content) return;

    const postData: Partial<Post> = {
      title,
      description,
      content,
      published: flagPublished,
    };

    createPost(postData, {
      onSuccess: () => {
        toast.success("Post created successfully!");
        setTitle("");
        setDescription("");
        setContent("");
        setShowEditor(false);
      },
    });
  };

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
              onClick={() => handlePostPublish(false)}
              disabled={isCreating}
            >
              Save Draft
            </Button>
            <Button
              variation="publish"
              disabled={isCreating}
              onClick={() => handlePostPublish(true)}
            >
              Publish
            </Button>
          </ButtonContainer>

          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextEditor content={content} setContent={setContent} />
        </>
      )}
    </StyledCreatePost>
  );
};

export default CreatePost;
//   {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
