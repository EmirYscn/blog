import styled from "styled-components";
import Menus from "./Menus";
import { useNavigate } from "react-router";
import { useUser } from "../hooks/useUser";
import { User } from "../types/types";
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineTrash } from "react-icons/hi2";

type PostMenusType = {
  postId: string;
  authorId: string;
};

function PostMenus({ postId, authorId }: PostMenusType) {
  const navigate = useNavigate();
  const { user } = useUser();
  return (
    <Menus>
      <Menus.Menu>
        <Menus.Toggle id={postId} />
        <Menus.List id={postId}>
          <Menus.Button
            icon={<FaRegUser />}
            onClick={() => navigate(`/profile/${authorId}`)}
          >
            Profile
          </Menus.Button>
          {authorId === user?.id && (
            <Menus.Button icon={<HiOutlineTrash />}>Delete</Menus.Button>
          )}
        </Menus.List>
      </Menus.Menu>
    </Menus>
  );
}

export default PostMenus;
