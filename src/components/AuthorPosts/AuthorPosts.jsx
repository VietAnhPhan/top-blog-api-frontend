import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context";

const AuthorPosts = () => {
  const authContext = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  async function publish() {}

  async function unpublish() {}

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
        (post) => post.authorId == authContext.userId
      );
      console.log(authorPosts);
      setPosts(authorPosts);
    }

    getPosts();
  }, []);
  return (
    <>
      <h1>All of your posts show here</h1>
      {posts.length > 0 && (
        <ul className="flex flex-col gap-5">
          {posts.map((post, index) => {
            return (
              <li key={index} className="flex">
                <div className="flex-1">
                  <h3 className="text-2xl font-medium text-pink-800">
                    {post.title}
                  </h3>
                  <p>{post.body.slice(0, 100)}</p>
                </div>
                <div className="flex flex-1 gap-2.5">
                  {post.isPublished ? (
                    <button
                      type="button"
                      className="button-post-solid"
                      onClick={unpublish}
                    >
                      Unpublish
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="button-post-solid"
                      onClick={publish}
                    >
                      Publish
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default AuthorPosts;
