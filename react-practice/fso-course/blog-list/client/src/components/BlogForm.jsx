import { useState } from "react";

const NoteForm = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const createBlog = (e) => {
    e.preventDefault();

    const blog = {
      title,
      author,
      url,
    };

    addBlog(blog);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h1>create new</h1>
      <form id="blog-form" onSubmit={createBlog}>
        <div>
          title:{" "}
          <input
            id="title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="blog title"
          />
        </div>
        <div>
          author:{" "}
          <input
            id="author"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="blog author"
          />
        </div>
        <div>
          url:{" "}
          <input
            id="url"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder="blog url"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default NoteForm;
