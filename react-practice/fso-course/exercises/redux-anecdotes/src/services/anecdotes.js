import axios from "axios";

const baseUrl = "http://localhost:3000/anecdotes";

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const addAnecdote = async (content) => {
  const res = await axios.post(baseUrl, { content, votes: 0 });
  return res.data;
};

const updateAnecdote = async (content) => {
  const res = await axios.put(`${baseUrl}/${content.id}`, content);
  return res.data;
};

export default { getAll, addAnecdote, updateAnecdote };
