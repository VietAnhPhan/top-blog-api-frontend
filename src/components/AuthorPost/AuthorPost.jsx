import { useContext, useState } from "react";
import { AuthContext } from "../../Context";

const AuthorPost = ({ post }) => {
  const authContext = useContext(AuthContext);
  const [isPublished, setIspublished] = useState(post.isPublished);
  const [isActive, setIsActive] = useState(post.isActive);

  async function publish(postId) {
    const response = await fetch(`http://localhost:3000/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({ isPublished: true }),
      headers: {
        "Content-type": "application/json",
        Authorization: `bearer ${authContext.token}`,
      },
    });

    if (response.ok) {
      setIspublished(true);
    }
    if (!response.ok) {
      throw new Error();
    }
  }

  async function unpublish(postId) {
    const response = await fetch(`http://localhost:3000/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({ isPublished: false }),
      headers: {
        "Content-type": "application/json",
        Authorization: `bearer ${authContext.token}`,
      },
    });

    if (response.ok) {
      setIspublished(false);
    }

    if (!response.ok) {
      throw new Error();
    }
  }

  async function deletePost(postId) {
    const response = await fetch(`http://localhost:3000/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `bearer ${authContext.token}`,
      },
    });

    if (response.ok) {
      setIsActive(false);
    }

    if (!response.ok) {
      throw new Error();
    }
  }

  return (
    <>
      {isActive && (
        <>
          <div className="flex-1">
            <h3 className="text-2xl font-medium text-pink-800">{post.title}</h3>
          </div>
          <div className="flex flex-1 gap-2.5">
            {isPublished ? (
              <button
                type="button"
                className="button-post-solid"
                onClick={() => unpublish(post.id)}
              >
                Unpublish
              </button>
            ) : (
              <button
                type="button"
                className="button-post-solid"
                onClick={() => publish(post.id)}
              >
                Publish
              </button>
            )}
            <button
              type="button"
              className="button-post-solid"
              onClick={() => deletePost(post.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default AuthorPost;
