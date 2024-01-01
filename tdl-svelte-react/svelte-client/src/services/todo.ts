import axios from "axios";
import type { TodoType } from "../types";

const getTodos = async (token: string) => {
  const res = await axios.get<TodoType[]>("/api/get", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export default { getTodos };
