/* eslint-disable no-restricted-globals */
import React, { useCallback } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import css from "./App.module.scss";
import { TbClearAll } from "react-icons/tb";
import Header from "../../containers/Header/Header";
import CreateArea from "../../components/CreateArea/CreateArea";
import Note from "../../components/Note/Note";

export default function App() {
  const [notes, setNotes] = useLocalStorage("notes", []);

  const addNote = (inputNote) => {
    setNotes((prevNotes) => {
      return [...prevNotes, inputNote];
    });
  };

  const deleteNote = useCallback(
    (key) => {
      setNotes((prevNote) => {
        return prevNote.filter((note) => {
          return note.key !== key;
        });
      });
    },
    [setNotes]
  );

  // const editNote = useCallback((key) => {}, []);

  return (
    <main className={css.root}>
      <Header />
      <div className={css.wrapper}>
        <CreateArea onAdd={addNote} />

        {notes.length === 0 && (
          <span className={css.emptyNotes}>You don't have any notes.</span>
        )}

        {notes.map((item) => (
          <Note
            key={item.key}
            animate={item.animate}
            id={item.key}
            title={item.title}
            content={item.content}
            onDelete={deleteNote}
            // onEdit={editNote}
          />
        ))}

        {notes.length > 0 && (
          <button
            className={css.reset}
            onClick={() => {
              if (confirm("Do you want to delete all notes?")) {
                setNotes([]);
              }
            }}
          >
            <TbClearAll className={css.icon} />
          </button>
        )}
      </div>
    </main>
  );
}
