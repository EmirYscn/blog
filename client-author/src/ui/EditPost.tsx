import styled from "styled-components";
import Button from "./Button";
import { usePost } from "../hooks/usePost";
import { useEffect, useState } from "react";
import { useEditPost } from "../hooks/useEditPost";
import toast from "react-hot-toast";
import Input from "./Input";
import TextEditor from "./TextEditor";
import { BiSave } from "react-icons/bi";
import { ChangeEvent } from "../types/types";

const StyledEditPost = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 100rem;
  margin: 0 auto;

  & > button {
    /* margin: 0 0 0 auto; */
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

// const ButtonWrapper = styled.div`
//   display: flex;
//   max-width: 60rem;
//   margin: 0 auto;
//   width: 100%;
//   & > button {
//     margin: 0 0 0 auto;
//   }
// `;

function EditPost() {
  const { post } = usePost();
  const [showEditor, setShowEditor] = useState(true);
  const [title, setTitle] = useState(post?.title);
  const [description, setDescription] = useState(post?.description);
  const [content, setContent] = useState(post?.content);
  const [tags, setTags] = useState<string[]>(post?.tags ?? []);
  const [currentTag, setCurrentTag] = useState("");
  const [hasEditChanged, setHasEditChanged] = useState(false);
  const { edit, isLoading: isEditing } = useEditPost();

  useEffect(() => {
    if (
      title !== post?.title ||
      description !== post?.description ||
      content !== post?.content ||
      !areArraysEqual(tags, post?.tags)
    ) {
      setHasEditChanged(true);
    } else {
      setHasEditChanged(false);
    }
  }, [title, description, content, post, tags]);

  function areArraysEqual(arr1: string[], arr2: string[] = []) {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((tag) => arr2.includes(tag));
  }

  function handleEditPost() {
    if (!hasEditChanged) return;

    const postData = {
      title,
      description,
      content,
      tags,
    };
    edit(
      { postId: post!.id, body: postData },
      {
        onSuccess: () => {
          toast.success("Post edited successfully!");
          setShowEditor(false);
        },
      }
    );
  }

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

  function reset() {
    setTitle(post?.title);
    setDescription(post?.description);
    setContent(post?.content);
    setShowEditor(false);
  }
  return (
    <StyledEditPost>
      <Button variation="primary" onClick={() => setShowEditor(!showEditor)}>
        {showEditor ? "Hide Editor" : "Edit Post"}
      </Button>

      {showEditor && (
        <>
          <ButtonContainer>
            <Button
              icon={<BiSave />}
              variation="saveDraft"
              onClick={handleEditPost}
              disabled={!hasEditChanged || isEditing}
            >
              Save Edit
            </Button>

            <Button variation="danger" disabled={isEditing} onClick={reset}>
              Cancel
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
            value={description!}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            id="tags"
            value={currentTag}
            placeholder={tags.join(" ")} // Show tags inside input
            onChange={handleAddTag}
            onKeyDown={handleKeyDown}
          />
          <TextEditor content={content!} setContent={setContent} />
        </>
      )}
    </StyledEditPost>
  );
}

export default EditPost;
