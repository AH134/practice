import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === "ALL") {
      return anecdotes;
    }
    return anecdotes.filter((anecdotes) => anecdotes.content.includes(filter));
  });
  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);

  const handleVote = (id) => {
    console.log("vote", id);
    dispatch(vote(id));
  };

  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
