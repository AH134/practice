import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAnecdotes, updateAnecdote } from "./services/anecdotes";

const App = () => {
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
  );
};

export default App;
