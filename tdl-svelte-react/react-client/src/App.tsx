import axios from "axios";
import React, { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import { Item } from "./types";
import TodoItems from "./components/TodoItems";

function App() {
  const [name, setName] = useState("demo");
  const [password, setPassword] = useState("demo123");
  const [user, setUser] = useState(false);
  const [todoList, setToDoList] = useState<Item[]>([]);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const getToken = localStorage.getItem("token");
    if (!getToken) {
      return;
    }
    try {
      const res = await axios.get<Item[]>("/api/get", {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      const list = res.data.map((todo) => todo);
      setToDoList(list);
      setUser(true);
    } catch (e) {
      localStorage.removeItem("token");
      setUser(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const getToken = localStorage.getItem("token");
    if (getToken) {
      return;
    }
    e.preventDefault();
    const loginInfo = {
      name,
      password,
    };
    const res = await axios.post("/api/login", loginInfo);
    localStorage.setItem("token", res.data.message);
    setUser(true);
  };

  return (
    <div>
      {!user ? (
        <LoginForm
          handleLogin={handleLogin}
          name={name}
          password={password}
          setName={setName}
          setPassword={setPassword}
        />
      ) : null}

      {user && <TodoItems todoList={todoList} setTodoList={setToDoList} />}
    </div>
  );
}

export default App;
