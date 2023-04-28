import axios from "axios";

const baseUrl = "/api/blogs";
let token = null;

const setUserToken = (userToken) => {
  token = `Bearer ${userToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

export default { getAll, setUserToken };
