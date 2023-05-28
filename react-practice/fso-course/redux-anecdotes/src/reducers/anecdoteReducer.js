import { createSlice } from "@reduxjs/toolkit";
import noteService from "../services/anecdotes";

const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: initialState,
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    vote(state, action) {
      const changedAnecdote = action.payload;

      return state.map((anecdote) =>
        anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote
      );
    },
  },
});

export const { addAnecdote, vote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await noteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const newAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await noteService.addAnecdote(content);
    dispatch(addAnecdote(newAnecdote));
  };
};

export const setVote = (anecdote) => {
  return async (dispatch) => {
    const anecdoteToVote = await noteService.updateAnecdote({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch(vote(anecdoteToVote));
  };
};

export default anecdoteSlice.reducer;
