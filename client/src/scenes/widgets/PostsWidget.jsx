import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "state/authSlice";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);
  console.log(posts);


  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: "bearer " + `${token}` },
    });
    const data = await response.json();
    console.log(data);
    dispatch(setPosts({ posts: data }));
  };
  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authoriazation: "bearer " + `${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          description,
          picturePath,
          likes,
          comments,
          user,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            description={description}
            picturePath={picturePath}
            likes={likes}
            comments={comments}
            user={user}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
