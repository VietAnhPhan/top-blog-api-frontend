import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context";

function Home(props) {
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

      const result = await response.json();
      const listOfPosts = await Promise.all(
        result.posts.map(async (post) => {
          const authorResponse = await fetch(
            `http://localhost:3000/users/${post.authorId}`,
            {
              method: "GET",
              headers: {
                "Content-type": "application/json",
                Authorization: `bearer ${authContext.token}`,
              },
            }
          );

          const authorObj = await authorResponse.json();

          post.author = authorObj.user;

          return post;
        })
      );

      setPosts(listOfPosts);
    }

    getPosts();
  }, []);

  return (
    <div>
      <title>{`Homepage | ${props.sitename}`}</title>
      <h1>This is home page</h1>
      {posts.length > 0 && (
        <ul>
          {posts.map((post, index) => {
            if (post.isPublished) {
              return (
                <li key={index}>
                  <h2>{post.title}</h2>
                  <p>{post.body}</p>
                  <p>{post.author.username}</p>
                </li>
              );
            }
          })}
        </ul>
      )}
    </div>
  );
}

export default Home;
