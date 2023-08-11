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
import { NoteProps } from "../../types/types";

export default function App() {
  const context = useContext(Context);
  const [results, setResults] = useState<any[]>();
  console.log(results);

  const addNote = useCallback(
    (inputNote) => {
      const newNotes = [...(context?.notes as []), inputNote];
      context?.setNotes(newNotes.map((n) => ({ ...n, animate: n.key === inputNote.key })));
    },
    [context]
  );

  const deleteNote = useCallback(
    (key) => {
      const deletedNote = context!.notes.find((n) => n.key === key);
      const newNotes = context!.notes.filter((n) => n.key !== key);
      context?.setNotes(newNotes as []);
      context?.setDeletedNotes((prevNotes) => [...prevNotes, deletedNote!]);
    },
    [context]
  );

  const pinNote = useCallback(
    (key) => {
      const updatedNotes = context?.notes.map((n) => {
        if (n.key === key) {
          return { ...n, pinned: !n.pinned, animate: false };
        }
        return n;
      });

      const pinnedNote = updatedNotes?.find((n) => n.key === key);
      const restNote = updatedNotes?.filter((n) => n.key !== key);

      if (pinnedNote?.pinned) {
        context?.setNotes([pinnedNote, ...(restNote as [])]);
      } else if (pinnedNote && restNote) {
        context?.setNotes([...restNote, pinnedNote]);
      }
    },
    [context]
  );

  const editNote = useCallback(
    (key) => {
      const noteIndex = context?.notes.findIndex((n) => n.key === key);
      if (noteIndex !== -1) {
        const newTitle = prompt("Type the new Title");
        const newText = prompt("Type the new Text");

        if (newTitle || newText) {
          const updatedNotes = context?.notes.map((n) => {
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

          context?.setNotes(updatedNotes as []);
        }
      }
    },
    [context]
  );

  const duplicateNote = useCallback(
    (key) => {
      const note = context?.notes.find((n) => n.key === key);
      const newTitle = note?.title;
      const newText = note?.text;

      const duplicatedNote = {
        key: uuid(),
        pinned: false,
        edited: false,
        createdAt: new Date(),
        title: newTitle,
        text: newText,
      };

      const newNotes = [...context!.notes, duplicatedNote];
      context?.setNotes(newNotes as []);
    },
    [context]
  );

  const handleOnDragEnd = (result: {
    destination: { index: number };
    source: { index: number };
  }) => {
    if (!result.destination) return;

    const items = Array.from(context!.notes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    context?.setNotes(items);
  };

  useEffect(() => {
    const fuse = new Fuse(context!.notes, {
      keys: ["title", "text"],
    });

    setResults(fuse.search(context!.search));
    return () => {};
  }, [context]);

  return (
    <main className={classNames(css.root, { [css.darkMode]: context?.darkTheme })}>
      <div className={css.wrapper}>
        <CreateArea onAdd={addNote} className={css.createArea} />

        <div className={css.container}>
          {context?.search ? (
            <div className={css.notes}>
              {results?.length === 0 ? (
                <p className={css.noResults}>No matching results.</p>
              ) : (
                results?.map((n) => (
                  <Note
                    key={n.item.key}
                    id={n.item.key}
                    text={n.item.text}
                    title={n.item.title}
                    edited={n.item.edited}
                    pinned={n.item.pinned}
                    animate={n.item.animate}
                    createdAt={n.item.createdAt}
                    handlePin={() => pinNote(n.item.key)}
                    handleEdit={() => editNote(n.item.key)}
                    handleDelete={() => deleteNote(n.item.key)}
                    handleDuplicate={() => duplicateNote(n.item.key)}
                    infoButton
                  />
                ))
              )}
            </div>
          ) : (
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="notes">
                {(provided: {
                  innerRef: React.LegacyRef<HTMLDivElement> | undefined;
                  droppableProps: JSX.IntrinsicAttributes &
                    React.ClassAttributes<HTMLDivElement> &
                    React.HTMLAttributes<HTMLDivElement>;
                  placeholder:
                    | boolean
                    | React.ReactChild
                    | React.ReactFragment
                    | React.ReactPortal
                    | null
                    | undefined;
                }) => (
                  <div className={css.notes} ref={provided.innerRef} {...provided.droppableProps}>
                    {context?.notes.map((n: NoteProps, i) => {
                      return (
                        <Draggable key={n.key} draggableId={n.key} index={i}>
                          {(provided: {
                            innerRef: any;
                            draggableProps: JSX.IntrinsicAttributes;
                            dragHandleProps: JSX.IntrinsicAttributes;
                          }) => (
                            <Note
                              id={n.id}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              key={n.id}
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

        {context!.notes.length > 0 ? (
          <>
            <button
              id="reset-btn"
              className={css.reset}
              onClick={() => {
                if (window.confirm("Do you want to delete all notes?")) {
                  context?.setNotes([]);
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
              delayHide={2000}
            />
          </>
        ) : (
          <span className={css.emptyNotes}>You don't have any notes.</span>
        )}
      </div>
    </main>
  );
}
