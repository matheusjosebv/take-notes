import css from "./App.module.scss";
import classNames from "classnames";
import ThemeContext from "../../hooks/ThemeContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import React, { useCallback, useContext, useEffect, useState } from "react";

import Note from "../../components/Note/Note";
import Header from "../../containers/Header/Header";
import CreateArea from "../../components/CreateArea/CreateArea";

import { MdDeleteSweep } from "react-icons/md";
import Footer from "../../components/Footer/Footer";
import { format, parseISO } from "date-fns";

export default function App() {
  const [storageNotes, setStorageNotes] = useLocalStorage("notes", []);
  const [notes, setNotes] = useState(storageNotes);

  const { darkTheme } = useContext(ThemeContext);

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

  const PinNote = useCallback(
    (key) => {
      const updatedNotes = notes.map((n) => {
        if (n.key === key) {
          return { ...n, pinned: !n.pinned, animate: false };
        }
        return n;
      });

      const pinnedNote = updatedNotes.find((n) => n.key === key);
      const restNote = updatedNotes.filter((n) => n.key !== key);

      if (pinnedNote.pinned) {
        setNotes([pinnedNote, ...restNote]);
      } else {
        setNotes([...restNote, pinnedNote]);
      }
    },
    [notes]
  );

  const editNote = useCallback(
    (key) => {
      const noteIndex = notes.findIndex((n) => n.key === key);
      if (noteIndex !== -1) {
        const newTitle = prompt("Type the new Title");
        const newText = prompt("Type the new Text");

        if (newTitle || newText) {
          const updatedNotes = notes.map((n) => {
            if (n.key === key) {
              return {
                ...n,
                title: newTitle,
                text: newText,
                animate: false,
                edited: true,
                createdAt: new Date(),
              };
            }
            return n;
          });

          setNotes(updatedNotes);
        }
      }
    },
    [notes]
  );

  const getInfo = useCallback(
    (key) => {
      const noteIndex = notes.findIndex((n) => n.key === key);
      const infoNote = notes[noteIndex].createdAt;
      const date = format(
        typeof infoNote === "string" ? parseISO(infoNote) : infoNote,
        "MMMM do, yyyy H:mma",
        {
          awareOfUnicodeTokens: true,
        }
      );

      alert(`This note was created at ${date}`);
    },
    [notes]
  );

  useEffect(() => {
    setStorageNotes(notes.map((n) => ({ ...n, animate: false })));
  }, [notes, setStorageNotes]);

  return (
    <main className={classNames(css.root, { [css.darkMode]: darkTheme })}>
      <Header />
      <div className={css.wrapper}>
        <CreateArea onAdd={addNote} />

        <div className={css.container}>
          <div className={css.notes}>
            {notes.map((n) => (
              <Note
                id={n.key}
                key={n.key}
                text={n.text}
                title={n.title}
                edited={n.edited}
                pinned={n.pinned}
                animate={n.animate}
                createdAt={n.createdAt}
                handlePin={() => PinNote(n.key)}
                handleInfo={() => getInfo(n.key)}
                handleEdit={() => editNote(n.key)}
                handleDelete={() => deleteNote(n.key)}
              />
            ))}
          </div>
        </div>

        {notes.length > 0 ? (
          <button
            className={css.reset}
            onClick={() => {
              if (window.confirm("Do you want to delete all notes?")) {
                setNotes([]);
              }
            }}
          >
            <MdDeleteSweep className={css.icon} />
          </button>
        ) : (
          <span className={css.emptyNotes}>You don't have any notes.</span>
        )}
      </div>
      <Footer />
    </main>
  );
}
