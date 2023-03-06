/* eslint-disable no-restricted-globals */
import React, { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import css from "./App.module.scss";
import { MdDeleteSweep } from "react-icons/md";
import Header from "../../containers/Header/Header";
import CreateArea from "../../components/CreateArea/CreateArea";
import Note from "../../components/Note/Note";

export default function App() {
  const [storageNotes, setStorageNotes] = useLocalStorage("notes", []);
  const [notes, setNotes] = useState(storageNotes);

  const addNote = useCallback(
    (inputNote) => {
      const newNotes = [...notes, inputNote];
      setNotes(
        newNotes.map((n) => ({ ...n, animate: n.key === inputNote.key }))
      );
    },
    [notes]
  );

  const deleteNote = useCallback(
    (key) => {
      const newNotes = notes.filter((n) => n.key !== key);
      setNotes(newNotes);
    },
    [notes]
  );

  useEffect(() => {
    setStorageNotes(notes.map((n) => ({ ...n, animate: false })));
  }, [notes, setStorageNotes]);

  return (
    <main className={css.root}>
      <Header />
      <div className={css.wrapper}>
        <CreateArea onAdd={addNote} />

        {notes.length === 0 && (
          <span className={css.emptyNotes}>You don't have any notes.</span>
        )}

        <div className={css.container}>
          <div className={css.notes}>
            {notes.map((item) => (
              <Note
                id={item.key}
                key={item.key}
                title={item.title}
                content={item.content}
                animate={item.animate}
                onDelete={deleteNote}
              />
            ))}
          </div>
        </div>

        {notes.length > 0 && (
          <button
            className={css.reset}
            onClick={() => {
              if (confirm("Do you want to delete all notes?")) {
                setNotes([]);
              }
            }}
          >
            <MdDeleteSweep className={css.icon} />
          </button>
        )}
      </div>
    </main>
  );
}
