import axios from "axios";
import type { LoginInfo, Message } from "../types";

export const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return "";
  }

  return token;
};

const login = async (userObj: LoginInfo) => {
  const res = await axios.post<Message>("/api/login", userObj);
  return res.data;
};

export default { login, getToken };
