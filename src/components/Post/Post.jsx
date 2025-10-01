import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context";
import { useParams } from "react-router";
import Comment from "../Comment/Component";

const Post = () => {
  const authContext = useContext(AuthContext);
  const params = useParams();
  const [enableSubmit, setEnablesubmit] = useState(false);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(
    "<p>This is the initial content of the editor.</p>"
  );

  const [comments, setComments] = useState([]);

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

    async function getComments() {
      const response = await fetch(
        `http://localhost:3000/comments?postId=${params.postId}`,
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
        setComments(result.comments);
      }
    }

    getPost();
    getComments();
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
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                if (!enableSubmit) setEnablesubmit(true);
              }}
            ></textarea>
          </p>
          {enableSubmit ? (
            <button type="submit" className="button-solid">
              Submit
            </button>
          ) : (
            <button disabled type="submit" className="button-solid bg-gray-500">
              Submit
            </button>
          )}
        </form>
        {comments.length > 0 && (
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>
                <p>{comment.user.username}</p>
                <p>{comment.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Post;
