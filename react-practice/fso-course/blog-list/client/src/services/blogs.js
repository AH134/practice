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

const update = async (newObject) => {
  const res = await axios.put(`${baseUrl}/${newObject.id}`, newObject);
  return res.data;
};

const remove = async (blogId) => {
  const config = {
    headers: { authorization: token },
  };
  const res = await axios.delete(`${baseUrl}/${blogId}`, config);
  return res.data;
};

export default { getAll, setUserToken, create, update, remove };
