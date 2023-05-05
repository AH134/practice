import { useState } from "react";

const Blog = ({ blog, updateLikes, deleteBlog }) => {
  const [visible, setVisible] = useState(false);

  const showOnVisible = { display: visible ? "" : "none" };
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleUpdateLIkes = () => {
    const updatedblog = { ...blog, likes: blog.likes + 1 };
    updateLikes(updatedblog);
  };

  const handleDeleteBlog = () => {
    const confirmation = confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    );

    if (confirmation) {
      deleteBlog(blog.id);
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div className="blog-header">
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibility}>view</button>
      </div>

      <div style={showOnVisible} className="blog-body">
        {blog.url}
        <br />
        likes {blog.likes} <button onClick={handleUpdateLIkes}>like</button>
        <br />
        {blog.user.name}
        <br />
        <button onClick={handleDeleteBlog}>remove</button>
      </div>
    </div>
  );
};

export default Blog;
