import axios from "axios";

const baseURL = "http://localhost:3000/persons";

const getAll = () => {
  const req = axios.get(baseURL);
  return req.then((res) => res.data);
};

const create = (newObject) => {
  const req = axios.post(baseURL, newObject);
  return req.then((res) => res.data);
};

const remove = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};

const update = (id, newObject) => {
  const req = axios.put(`${baseURL}/${id}`, newObject);
  return req.then((res) => res.data);
};

export default { getAll, create, remove, update };
