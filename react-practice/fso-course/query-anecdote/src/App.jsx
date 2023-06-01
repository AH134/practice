import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAnecdotes, updateAnecdote } from "./services/anecdotes";
import { useReducer } from "react";
import NotificationContext from "./NotificationContext";

const messageReducer = (state, action) => {
  switch (action.type) {
    case "VOTE":
      return `anecdote '${action.payload}' voted`;
    case "CREATE":
      return `anecdote '${action.payload}' created`;
    case "ERROR":
      return "too short anecdote, must have length 5 or more";
    default:
      return "";
  }
};

const App = () => {
  const [message, messageDispatch] = useReducer(messageReducer, "");
  const queryClient = useQueryClient();
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData(
        "anecdotes",
        anecdotes.map((anecdote) =>
          anecdote.id !== newAnecdote.id ? anecdote : newAnecdote
        )
      );
      messageDispatch({ type: "VOTE", payload: newAnecdote.content });
    },
  });
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  const result = useQuery("anecdotes", getAnecdotes, {
    retry: false,
  });

  switch (result.status) {
    case "loading":
      return <div>Loading...</div>;
    case "error":
      return (
        <div>Anecdote service not available due to problems in server</div>
      );
  }
  console.log(result.data);

  const anecdotes = result.data;

  return (
    <NotificationContext.Provider value={[message, messageDispatch]}>
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />

        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export default App;
