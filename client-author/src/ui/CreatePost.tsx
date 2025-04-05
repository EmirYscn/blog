import { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { BiSave } from "react-icons/bi";

import { ChangeEvent, Post } from "../types/types";
import { useCreatePost } from "../hooks/useCreatePost";

import TextEditor from "./TextEditor";
import Button from "./Button";
import Input from "./Input";

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
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const { createPost, isLoading: isCreating } = useCreatePost();

  const handlePostPublish = async (flagPublished: boolean) => {
    if (!title) return;
    if (!content) return;

    const postData: Partial<Post> = {
      title,
      description,
      content,
      tags,
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

  function handleAddTag(e: ChangeEvent) {
    const value = e.target.value.trim();

    // Prevent spaces inside the tag while typing
    if (value.includes(" ")) return;

    setCurrentTag(value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === " " && currentTag.trim() !== "") {
      e.preventDefault(); // Prevent space from being added in input

      if (!tags.includes(currentTag)) {
        setTags([...tags, currentTag]);
      }

      setCurrentTag(""); // Clear input after saving tag
    }

    if (e.key === "Backspace" && currentTag === "" && tags.length > 0) {
      e.preventDefault();
      setTags(tags.slice(0, -1)); // Remove last tag when input is empty
    }
  }

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
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            value={currentTag}
            placeholder={tags.join(" ")} // Show tags inside input
            onChange={handleAddTag}
            onKeyDown={handleKeyDown}
          />
          <TextEditor content={content} setContent={setContent} />
        </>
      )}
    </StyledCreatePost>
  );
};

export default CreatePost;
