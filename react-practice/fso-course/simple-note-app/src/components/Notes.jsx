import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";
import noteService from "../services/notes";

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong>{note.important ? " important" : ""}</strong>
    </li>
  );
};

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector(({ filter, notes }) => {
    if (filter === "ALL") {
      return notes;
    }
    return filter === "IMPORTANT"
      ? notes.filter((note) => note.important)
      : notes.filter((note) => !note.important);
  });

  const handleToggleImportance = (note) => {
    noteService.updateImportance({ ...note, important: !note.important });
    dispatch(toggleImportanceOf(note.id));
  };

  return (
    <ul>
      {notes.map((note) => {
        return (
          <Note
            key={note.id}
            note={note}
            handleClick={() => handleToggleImportance(note)}
          />
        );
      })}
    </ul>
  );
};

export default Notes;
