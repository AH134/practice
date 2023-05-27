import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === "ALL") {
      return anecdotes;
    }
    return anecdotes.filter((anecdotes) => anecdotes.content.includes(filter));
  });

  // copies the original array and sorts it
  // so that the original won't be mutated
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const handleVote = (id) => {
    console.log("vote", id);
    const voteAnecdote = anecdotes.find(
      (anecdote) => anecdote.id === id
    ).content;

    dispatch(vote(id));
    dispatch(setNotification(`you voted '${voteAnecdote}'`));

    setTimeout(() => {
      dispatch(setNotification(""));
    }, 5000);
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
