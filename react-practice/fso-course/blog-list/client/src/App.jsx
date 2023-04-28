import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      localStorage.setItem("loggedBlogListUser", JSON.stringify(user));
      blogService.setUserToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception.message);
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleOnSubmit}>
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
    );
  };

  return (
    <div>
      <h2>blogs</h2>

      {!user && loginForm()}
      {user && loggedIn()}
      <br />

      {user && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
