import { useState } from "react";

const Comment = (props) => {
  const [comment, setComment] = useState(props.comment);

  async function handleSubmit(commentId) {
    const response = await fetch(
      `http://localhost:3000/comments/${commentId}`,
      {
        method: "PUT",
        body: JSON.stringify({ comment: comment.comment }),
        headers: {
          "Content-type": "application/json",
          Authorization: `bearer ${props.authContext.token}`,
        },
      }
    );

    if (response.ok) {
      const result = await response.json();
      setComment({ ...comment, comment: result.comment });
    }
    return;
  }

  return (
    <>
    <p>ID: {comment.id}</p>
      <p>Title: {comment.post.title}</p>
      <p>{comment.user.username}</p>
      <p>at {comment.created_at}</p>
      <textarea
        value={comment.comment}
        className="rounded-md"
        cols={100}
        onChange={(e) => setComment({ ...comment, comment: e.target.value })}
      ></textarea>
      <div className="flex gap-4">
        <button
          type="button"
          className="button-solid"
          onClick={() => {
            handleSubmit(comment.id);
          }}
        >
          Submit
        </button>
        <button
          type="button"
          className="button-solid"
          onClick={() => {
            props.deleteComment(comment.id);
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default Comment;
