import Fuse from "fuse.js";
import { v4 as uuid } from "uuid";
import classNames from "classnames";
import css from "./PageHome.module.scss";
import Context from "../../hooks/Context";
import { Tooltip as ReactTooltip } from "react-tooltip";
import React, { useCallback, useContext, useEffect, useState } from "react";

import Note from "../../components/Note/Note";
import CreateArea from "../../components/CreateArea/CreateArea";

import { MdDeleteSweep } from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function App() {
  const { darkTheme, search, setDeletedNotes, notes, setNotes } =
    useContext(Context);

  const [results, setResults] = useState();

  const addNote = useCallback(
    (inputNote) => {
      const newNotes = [...notes, inputNote];
      setNotes(
        newNotes.map((n) => ({ ...n, animate: n.key === inputNote.key }))
      );
    },
    [notes, setNotes]
  );

  const deleteNote = useCallback(
    (key) => {
      const deletedNote = notes.find((n) => n.key === key);
      const newNotes = notes.filter((n) => n.key !== key);
      setNotes(newNotes);
      setDeletedNotes((prevNotes) => [...prevNotes, deletedNote]);
    },
    [notes, setDeletedNotes, setNotes]
  );

  const pinNote = useCallback(
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
    [notes, setNotes]
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
    [notes, setNotes]
  );

  const duplicateNote = useCallback(
    (key) => {
      const note = notes.find((n) => n.key === key);
      const newTitle = note.title;
      const newText = note.text;

      const duplicatedNote = {
        key: uuid(),
        pinned: false,
        edited: false,
        createdAt: new Date(),
        title: newTitle,
        text: newText,
      };

      const newNotes = [...notes, duplicatedNote];
      setNotes(newNotes);
    },
    [notes, setNotes]
  );

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(notes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setNotes(items);
  };

  useEffect(() => {
    const fuse = new Fuse(notes, {
      keys: ["title", "text"],
    });

    setResults(fuse.search(search));
    return () => {};
  }, [notes, search]);

  return (
    <main className={classNames(css.root, { [css.darkMode]: darkTheme })}>
      <div className={css.wrapper}>
        <CreateArea onAdd={addNote} className={css.createArea} />

        <div className={css.container}>
          {search ? (
            <div className={css.notes}>
              {!results.length ? (
                <p className={css.noResults}>No matching results.</p>
              ) : (
                results.map((n) => (
                  <Note
                    id={n.item.key}
                    key={n.item.key}
                    text={n.item.text}
                    title={n.item.title}
                    edited={n.item.edited}
                    pinned={n.item.pinned}
                    // image={"../../assets/images/img-2.png"}
                    animate={n.item.animate}
                    createdAt={n.item.createdAt}
                    handlePin={() => pinNote(n.item.key)}
                    handleEdit={() => editNote(n.item.key)}
                    handleDelete={() => deleteNote(n.item.key)}
                    handleDuplicate={() => duplicateNote(n.item.key)}
                  />
                ))
              )}
            </div>
          ) : (
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="notes">
                {(provided) => (
                  <div
                    className={css.notes}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {notes.map((n, i) => {
                      return (
                        <Draggable key={n.key} draggableId={n.key} index={i}>
                          {(provided) => (
                            <Note
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              infoButton
                              text={n.text}
                              title={n.title}
                              edited={n.edited}
                              pinned={n.pinned}
                              animate={n.animate}
                              createdAt={n.createdAt}
                              handlePin={() => pinNote(n.key)}
                              handleEdit={() => editNote(n.key)}
                              handleDelete={() => deleteNote(n.key)}
                              handleDuplicate={() => duplicateNote(n.key)}
                            />
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>

        {notes.length > 0 ? (
          <>
            <button
              id="reset-btn"
              className={css.reset}
              onClick={() => {
                if (window.confirm("Do you want to delete all notes?")) {
                  setNotes([]);
                }
              }}
            >
              <MdDeleteSweep className={css.icon} />
            </button>
            <ReactTooltip
              style={{ fontSize: "10px", padding: "4px 6px" }}
              anchorSelect="#reset-btn"
              place="top"
              content="Delete all notes"
              noArrow
              delayShow={100}
              // delayHide={2000}
            />
          </>
        ) : (
          <span className={css.emptyNotes}>You don't have any notes.</span>
        )}
      </div>
    </main>
  );
}
