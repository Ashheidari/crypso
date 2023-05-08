import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "state/authSlice";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: "bearer" + `${token}` },
    });
    const posts = await response.json();
    dispatch(setPosts({ posts: posts }));
  };
  const getUserPosts = async () => {
    const response = await fetch(`http://localhost:3001/${userId}/posts`, {
      method: "GET",
      headers: { Authoriazation: "bearer" + `${token}` },
    });
    const posts = await response.json();
    dispatch(setPosts({ posts: posts }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps
};

return (
  <>
    {posts.map(({ _id, description, picturePath, comments, likes, user }) => (
      <PostWidget
        key={_id}
        postId={_id}
        description={description}
        picturePath={picturePath}
        comments = {comments}
        likes = {likes}
        user = {user}
      />
    ))}
  </>
);
export default PostsWidget;