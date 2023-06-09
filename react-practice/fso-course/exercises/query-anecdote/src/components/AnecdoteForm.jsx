import { addAnecdote } from "../services/anecdotes";
import { useMutation, useQueryClient } from "react-query";

import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const AnecdoteForm = () => {
  const [message, messageDispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(addAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdote = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", anecdote.concat(newAnecdote));
      messageDispatch({ type: "CREATE", payload: newAnecdote.content });
    },
    onError: () => {
      messageDispatch({ type: "ERROR" });
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    console.log("new anecdote");
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
