import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context";
import { useParams } from "react-router";

const Post = () => {
  const authContext = useContext(AuthContext);
  const params = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(
    "<p>This is the initial content of the editor.</p>"
  );

  useEffect(() => {
    async function getPost() {
      const response = await fetch(
        `http://localhost:3000/posts/${params.postId}`,
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
        setTitle(result.post.title);
        setBody(result.post.body);
      }
    }

    getPost();
  });

  async function submitComment(formData) {
    const comment = formData.get("comment");
    const userId = authContext.userId;
    const postId = params.postId;

    await fetch("http://localhost:3000/comments", {
      method: "POST",
      body: JSON.stringify({ comment, userId, postId }),
      headers: {
        "Content-type": "application/json",
        Authorization: `bearer ${authContext.token}`,
      },
    });

    return;
  }

  return (
    <>
      <div className="container">
        <h1>{title}</h1>
        <p>{body}</p>
        <form action={submitComment}>
          <label htmlFor="comment">Share your thoughts...</label>
          <p>
            <textarea
              name="comment"
              type="text"
              placeholder="Leave your comment here..."
            ></textarea>
          </p>

          <div className="flex gap-2.5">
            <button type="submit" className="button-solid">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Post;
