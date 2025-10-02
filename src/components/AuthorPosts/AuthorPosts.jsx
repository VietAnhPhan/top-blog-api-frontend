import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context";
import AuthorPost from "../AuthorPost/AuthorPost";
import Comment from "../Comment/Component";

const AuthorPosts = () => {
  const authContext = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  async function deleteComment(commentId) {
    const response = await fetch(
      `http://localhost:3000/comments/${commentId}`,
      {
        method: "DELETE",

        headers: {
          Authorization: `bearer ${authContext.token}`,
        },
      }
    );

    if (response.ok) {
      const response = await fetch(
        `http://localhost:3000/comments?authorId=${authContext.userId}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `bearer ${authContext.token}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        // console.log(result);
        // return;

        setComments(result.comments);
      }
    }
    return;
  }

  useEffect(() => {
    async function getPosts() {
      const response = await fetch("http://localhost:3000/posts", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `bearer ${authContext.token}`,
        },
      });

      const posts = await response.json();

      const authorPosts = posts.posts.filter(
        (post) => post.authorId == authContext.userId && post.isActive == true
      );

      setPosts(authorPosts);
    }

    async function getComments() {
      const response = await fetch(
        `http://localhost:3000/comments?authorId=${authContext.userId}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `bearer ${authContext.token}`,
          },
        }
      );

      const result = await response.json();

      setComments(result.comments);
    }

    getPosts();
    getComments();
  }, [authContext.userId, authContext.token]);

  return (
    <>
      <div className="container">
        <h1 className="text-center">All of your posts show here</h1>
        {posts.length > 0 && (
          <div className="mt-16">
            <ul className="flex flex-col gap-5">
              {posts.map((post, index) => {
                return (
                  <li key={index}>
                    <AuthorPost post={post}></AuthorPost>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <h2 className="text-center mt-16">Comments from readers</h2>
        {comments.length > 0 && (
          <ul>
            {comments.map((comment) => {
              return (
                <li className="pt-5" key={comment.id}>
                  <Comment
                    comment={comment}
                    authContext={authContext}
                    deleteComment={deleteComment}
                  ></Comment>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default AuthorPosts;
