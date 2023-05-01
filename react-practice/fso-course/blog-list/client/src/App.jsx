import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notifcation";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [isSuccessful, setIsSuccessful] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const getBlogs = async () => {
      if (user) {
        let blogs = await blogService.getAll();
        blogs = blogs.filter((blog) => blog.user.name === user.name);
        const sortedBlogs = blogs.sort((a, b) => {
          if (a.likes > b.likes) {
            return -1;
          }
          if (a.likes < b.likes) {
            return 1;
          }
          return 0;
        });
        setBlogs(sortedBlogs);
      }
    };
    getBlogs();
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("loggedBlogListUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setUserToken(user.token);
      setUser(user);
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
  const addBlog = async (newBlog) => {
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

  const deleteBlog = async (blogId) => {
    try {
      await blogService.remove(blogId);

      setBlogs(blogs.filter((blog) => blog.id !== blogId));
    } catch (exception) {
      setMessage(exception.message);

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const updateLikes = async (newObject) => {
    try {
      const updatedBlog = await blogService.update(newObject);
      const updatedBlogArray = blogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
      const sortedBlogs = updatedBlogArray.sort((a, b) => {
        if (a.likes > b.likes) {
          return -1;
        }
        if (a.likes < b.likes) {
          return 1;
        }
        return 0;
      });

      setBlogs(sortedBlogs);
    } catch (exception) {
      setMessage(exception.message);

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} isSuccessful={isSuccessful} />

      {!user && (
        <LoginForm
          handleSubmit={handleLogin}
          password={password}
          username={username}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleUsernameChange={({ target }) => setUsername(target.value)}
        />
      )}

      {user && (
        <div>
          {user.name} logged in{" "}
          <button
            onClick={() => {
              localStorage.removeItem("loggedBlogListUser");
              window.location.reload();
            }}
          >
            logout
          </button>
        </div>
      )}

      {user && (
        <Togglable buttonLabel="create new blog">
          <BlogForm
            handleOnLogout={() => localStorage.removeItem("loggedBlogListUser")}
            addBlog={addBlog}
          />
        </Togglable>
      )}
      <br />

      {user &&
        blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateLikes={updateLikes}
            deleteBlog={deleteBlog}
          />
        ))}
    </div>
  );
};

export default App;
