import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const MostVotedAnecdote = ({ anecdote, votes }) => {
  const mostVotes = Math.max(...votes);
  const index = votes.indexOf(mostVotes);

  return (
    <p>
      {anecdote[index]} has {mostVotes} votes
    </p>
  );
};
const App = () => {
  const points = new Array(8).fill(0);

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(points);

  const handleNextAnecdote = () => {
    const randomNumber = Math.round(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  const handleVote = () => {
    const copyPoints = [...votes];
    copyPoints[selected] += 1;
    setVotes(copyPoints);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />

      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={handleNextAnecdote} text="next anecdote" />

      <h1>Anecdote with most votes</h1>
      <MostVotedAnecdote anecdote={anecdotes} votes={votes} />
    </div>
  );
};

export default App;
