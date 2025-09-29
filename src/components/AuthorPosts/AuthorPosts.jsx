import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context";
import AuthorPost from "../AuthorPost/AuthorPost";

const AuthorPosts = () => {
  const authContext = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

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

    getPosts();
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
      </div>
    </>
  );
};

export default AuthorPosts;
