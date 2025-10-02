import { Editor } from "@tinymce/tinymce-react";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../Context";

const NewPost = () => {
  const authContext = useContext(AuthContext);
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(
    "<p>This is the initial content of the editor.</p>"
  );

  async function publishPost() {
    const publishedPost = {
      title,
      body,
      authorId: authContext.userId,
      isPublished: true,
      published_at: new Date(),
    };
    // console.log(publishedPost);
    // return;
    const post = await fetch("http://localhost:3000/posts", {
      method: "POST",
      body: JSON.stringify(publishedPost),
      headers: {
        "Content-type": "application/json",
        Authorization: `bearer ${authContext.token}`,
      },
    });

    return;
  }

  async function draftPost() {
    const publishedPost = {
      title,
      body,
      authorId: authContext.userId,
      isPublished: false,
      published_at: new Date(),
    };

    const post = await fetch("http://localhost:3000/posts", {
      method: "POST",
      body: JSON.stringify(publishedPost),
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
        <h1 className="text-center">Create new post</h1>
        <form>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Your title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
          />
          <Editor
            apiKey="no-api-key"
            onInit={(_evt, editor) => (editorRef.current = editor)}
            value={body}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={(newValue, editor) => setBody(newValue)}
          />
          <div className="flex gap-2.5 justify-center mt-16">
            <button
              type="button"
              className="button-solid"
              onClick={publishPost}
            >
              Publish
            </button>
            <button type="button" className="button-solid" onClick={draftPost}>
              Save draft
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewPost;
