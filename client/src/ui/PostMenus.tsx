import styled from "styled-components";
import Menus from "./Menus";

type PostMenusType = {
  postId: number;
};

function PostMenus({ postId }: PostMenusType) {
  return (
    <Menus>
      <Menus.Menu>
        <Menus.Toggle id={postId} />
        <Menus.List id={postId}>
          <Menus.Button>Profile</Menus.Button>
          <Menus.Button>Settings</Menus.Button>
          <Menus.Button>Logout</Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Menus>
  );
}

export default PostMenus;
