import React, { useState } from "react";
import { Item } from "../types";
import axios from "axios";

type Props = {
  todoList: Item[];
  setTodoList: React.Dispatch<React.SetStateAction<Item[]>>;
};

function TodoItems({ todoList, setTodoList }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault();

    const getToken = localStorage.getItem("token");
    if (!getToken) {
      return;
    }

    const item: Item = {
      id: todoList.length < 1 ? 1 : todoList[todoList?.length - 1].id + 1,
      user_id: 1,
      title,
      description,
      status: false,
    };
    const newTodoList = todoList.concat(item);
    setTodoList(newTodoList);

    await axios.post("/api/post", item, {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    });
  };

  const handleStatus = async (
    e: React.ChangeEvent<HTMLInputElement>,
    todo: Item
  ) => {
    const getToken = localStorage.getItem("token");
    if (!getToken) {
      return;
    }

    let newTodo: Item;

    if (e.target.checked) {
      newTodo = { ...todo, status: true };
    } else {
      newTodo = { ...todo, status: false };
    }
    console.log(e.target.checked, newTodo.status);
    const res = await axios.patch("/api/update", newTodo, {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    });

    console.log(res.data);
  };

  const handleDelete = async (id: number) => {
    const getToken = localStorage.getItem("token");
    if (!getToken) {
      return;
    }
    setTodoList((todoList) => todoList.filter((todo) => todo.id != id));
    const res = await axios.delete(`/api/delete?id=${id}`, {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    });
    console.log(res.data);
  };

  return (
    <div>
      <h4>Todo List</h4>
      <form onSubmit={(e) => handleSumbit(e)}>
        Title:{" "}
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        Desc:{" "}
        <input
          type="text"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <br />
        <button type="submit">submit</button>
      </form>
      {todoList.map((todo) => {
        return (
          <div key={todo.id}>
            <p>
              Title: {todo.title} | Desc: {todo.description} | Status:{" "}
              {todo.status ? "Finished" : "Unfinished"}{" "}
              <span>
                {todo.status ? (
                  <input
                    type="checkbox"
                    checked
                    onChange={(e) => handleStatus(e, todo)}
                  />
                ) : (
                  <input
                    type="checkbox"
                    onChange={(e) => handleStatus(e, todo)}
                  />
                )}
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default TodoItems;
