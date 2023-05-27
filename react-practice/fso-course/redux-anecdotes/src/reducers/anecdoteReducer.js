import { createSlice } from "@reduxjs/toolkit";

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
    createAnecdote(state, action) {
      const anecdoteToAdd = asObject(action.payload);
      return state.concat(anecdoteToAdd);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    vote(state, action) {
      const anecdoteToFind = state.find(
        (anecdote) => anecdote.id === action.payload
      );
      const changedAnecdote = {
        ...anecdoteToFind,
        votes: anecdoteToFind.votes + 1,
      };

      return state.map((anecdote) =>
        anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote
      );
    },
  },
});

export const { createAnecdote, vote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;

// const anecdoteReducer = (state = initialState, action) => {
//   console.log("state now: ", state);
//   console.log("action", action);

//   switch (action.type) {
//     case "VOTE": {
//       const anecdoteToFind = state.find(
//         (anecdote) => anecdote.id === action.payload.id
//       );
//       const changedAnecdote = {
//         ...anecdoteToFind,
//         votes: anecdoteToFind.votes + 1,
//       };

//       return state.map((anecdote) =>
//         anecdote.id !== action.payload.id ? anecdote : changedAnecdote
//       );
//     }
//     case "NEW_ANECDOTE": {
//       return state.concat(action.payload);
//     }
//     default:
//       return state;
//   }
// };

// export const vote = (id) => {
//   return {
//     type: "VOTE",
//     payload: { id: id },
//   };
// };

// export const createAnecdote = (content) => {
//   return {
//     type: "NEW_ANECDOTE",
//     payload: {
//       content: content,
//       id: getId(),
//       votes: 0,
//     },
//   };
// };
//export default anecdoteReducer;
