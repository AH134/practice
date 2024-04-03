import axios from "axios";

const baseUrl = "http://localhost:3000/anecdotes";

export const getAnecdotes = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

export const addAnecdote = async (anecdote) => {
  const res = await axios.post(baseUrl, anecdote);
  return res.data;
};

export const updateAnecdote = async (updatedAnecdote) => {
  const res = await axios.put(
    `${baseUrl}/${updatedAnecdote.id}`,
    updatedAnecdote
  );
  return res.data;
};
