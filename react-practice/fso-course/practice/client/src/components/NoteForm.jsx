import { useState } from "react";

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState("");

  const addNote = (e) => {
    e.preventDefault();
    createNote({
      content: newNote,
      important: true,
    });

    setNewNote("");
  };

  return (
    <div className="formDiv">
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          type="text"
          value={newNote}
          onChange={({ target }) => setNewNote(target.value)}
          placeholder="write note content here"
          id="note-input"
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default NoteForm;
