import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import noteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleCreateAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    await noteService.addAnecdote(content);
    dispatch(createAnecdote(content));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreateAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
