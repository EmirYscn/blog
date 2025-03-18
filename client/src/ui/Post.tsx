import { usePost } from "../hooks/usePost";

function Post() {
  const { post, isLoading } = usePost();

  return <div>{post?.author?.username}</div>;
}

export default Post;
