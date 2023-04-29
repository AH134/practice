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

const create = async (newObject) => {
  const config = {
    headers: { authorization: token },
  };
  const res = await axios.post(baseUrl, newObject, config);

  return res.data;
};

export default { getAll, setUserToken, create };
