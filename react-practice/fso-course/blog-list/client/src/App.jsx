import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notifcation";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const [isSuccessful, setIsSuccessful] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const getBlogs = async () => {
      if (user) {
        let blogs = await blogService.getAll();
        blogs = blogs.filter((blog) => blog.user.name === user.name);
        setBlogs(blogs);
      }
    };
    getBlogs();
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("loggedBlogListUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setUserToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      localStorage.setItem("loggedBlogListUser", JSON.stringify(user));
      blogService.setUserToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage("wrong username or password");

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };
  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };

    try {
      const blog = await blogService.create(newBlog);

      setBlogs(blogs.concat(blog));
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`);
      setIsSuccessful(true);

      setTimeout(() => {
        setMessage(null);
        setIsSuccessful(null);
      }, 5000);
    } catch (exception) {
      setMessage("title or url needed");

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          password
          <input
            type="text"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    );
  };

  const loggedIn = () => {
    return (
      <>
        <div>
          {user.name} logged in
          <button
            onClick={() => {
              localStorage.removeItem("loggedBlogListUser");
              location.reload();
            }}
          >
            logout
          </button>
        </div>

        <br />

        <h1>create new</h1>
        <form onSubmitCapture={handleCreateBlog}>
          <div>
            title:{" "}
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:{" "}
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:{" "}
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </>
    );
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} isSuccessful={isSuccessful} />

      {!user && loginForm()}
      {user && loggedIn()}
      <br />

      {user && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
