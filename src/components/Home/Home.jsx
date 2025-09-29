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
    <div className="container">
      <title>{`Homepage | ${props.sitename}`}</title>
      <div className="text-center">
        <h1>From the blog</h1>
        <p>Learn how to grow your business with our expert advice.</p>
      </div>
      {posts.length > 0 && (
        <ul className="grid grid-cols-3 mt-16 gap-8 gap-x-8">
          {posts.map((post, index) => {
            if (post.isPublished) {
              return (
                <li key={index}>
                  <h2 className="text-4xl font-medium">{post.title}</h2>
                  <p>{post.body.slice(0, 100)}</p>
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
