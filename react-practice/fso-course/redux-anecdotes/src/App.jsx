import { useEffect } from "react";
import noteService from "./services/anecdotes";
import { useDispatch } from "react-redux";
import { setAnecdotes } from "./reducers/anecdoteReducer";

import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    noteService.getAll().then((res) => dispatch(setAnecdotes(res)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
}

export default App;
