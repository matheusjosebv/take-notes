import Fuse from "fuse.js";
import { v4 as uuid } from "uuid";
import classNames from "classnames";
import css from "./PageHome.module.scss";
import Context from "../../hooks/Context";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useCallback, useContext, useEffect, useState } from "react";

import Note from "../../components/Note/Note";
import CreateArea from "../../components/CreateArea/CreateArea";

import { MdDeleteSweep } from "react-icons/md";
import { NoteProps, providedProps } from "../../types/types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function App() {
  const context = useContext(Context);
  const [results, setResults] = useState<{ item: NoteProps; refIndex: number }[]>();
  console.log(context?.notes, "NOTES");
  console.log(context?.pinnedNotes, "PINNED-NOTES");

  const addNote = useCallback(
    (inputNote) => {
      const newNotes = [...(context?.notes as []), inputNote];
      context?.setNotes(newNotes.map((n) => ({ ...n, animate: n.key === inputNote.key })));
    },
    [context]
  );

  const deleteNote = useCallback(
    (key) => {
      const unpinningNote = context?.pinnedNotes.map((n) => {
        if (n.key === key) {
          return { ...n, pinned: false };
        }
        return n;
      });

      const deletedNote = context!.notes.find((n) => n.key === key);
      const deletedPinnedNote = unpinningNote?.find((n) => n.key === key);

      if (deletedPinnedNote) {
        context?.setDeletedNotes((prevNotes) => [...prevNotes, deletedPinnedNote!]);
        context?.setPinnedNotes(unpinningNote?.filter((n) => n.key !== key) as []);
      }

      if (deletedNote) {
        context?.setDeletedNotes((prevNotes) => [...prevNotes, deletedNote!]);
        context?.setNotes(context!.notes.filter((n) => n.key !== key) as []);
      }
    },
    [context]
  );

  const deleteAllNotes = () => {
    if (window.confirm("Do you want to delete all notes?")) {
      const unpinnedNotes = context?.pinnedNotes.map((n) => ({ ...n, pinned: false }));
      context?.setNotes([]);
      context?.setDeletedNotes((prev) => [...prev, ...context?.notes, ...unpinnedNotes!]);
      context?.setPinnedNotes([]);
    }
  };

  const pinNote = useCallback(
    (key) => {
      const updatedNotes = context?.notes.map((n) => {
        if (n.key === key) {
          return { ...n, pinned: !n.pinned, animate: false };
        }
        return n;
      });

      const updatedPinnedNotes = context?.pinnedNotes.map((n) => {
        if (n.key === key) {
          return { ...n, pinned: !n.pinned, animate: false };
        }
        return n;
      });

      const selectedNote = updatedNotes?.find((n) => n.key === key);
      const selectedPinnedNote = updatedPinnedNotes?.find((n) => n.key === key);

      if (selectedNote) {
        context!.setPinnedNotes((prev) => [...prev, selectedNote]);
        context!.setNotes([...(updatedNotes?.filter((n) => n.key !== key) as [])]);
      }

      if (selectedPinnedNote) {
        context!.setNotes((prev) => [...prev, selectedPinnedNote!]);
        context!.setPinnedNotes([...(updatedPinnedNotes?.filter((n) => n.key !== key) as [])]);
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

          context?.setNotes(updatedNotes as NoteProps[]);
        }
      }
    },
    [context]
  );

  const duplicateNote = useCallback(
    (key) => {
      const allNotes = [...context?.notes!, ...context?.pinnedNotes!];

      const note = allNotes.find((n) => n.key === key);
      const newTitle = note!.title;
      const newText = note!.text;
      const pinned = note!.pinned;

      const duplicatedNote = {
        ...note,
        key: uuid(),
        pinned: pinned,
        edited: false,
        createdAt: new Date(),
        title: newTitle,
        text: newText,
      };

      if (duplicatedNote.pinned === true) {
        context?.setPinnedNotes((prev) => [...prev, duplicatedNote] as NoteProps[]);
      }

      if (duplicatedNote.pinned === false) {
        context?.setNotes((prev) => [...prev, duplicatedNote] as NoteProps[]);
      }
    },
    [context]
  );

  const handleOnDragEndNotes = (result: {
    destination: { index: number };
    source: { index: number };
  }) => {
    if (!result.destination) return;

    const items = Array.from(context!.notes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    context?.setNotes(items);
  };

  const handleOnDragEndPinnedNotes = (result: {
    destination: { index: number };
    source: { index: number };
  }) => {
    if (!result.destination) return;

    const items = Array.from(context!.pinnedNotes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    context?.setPinnedNotes(items);
  };

  useEffect(() => {
    const allNotes = [...context?.notes!, ...context?.pinnedNotes!];
    const fuse = new Fuse(allNotes, {
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
          {context?.pinnedNotes.length! > 0 && results?.length! === 0 && (
            <DragDropContext onDragEnd={handleOnDragEndPinnedNotes}>
              <Droppable droppableId="pinnedNotes">
                {(provided: providedProps) => (
                  <div
                    className={css.pinnedNotes}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {context!.pinnedNotes.length > 0 && context!.notes.length > 0 && (
                      <h4 className={css.header}>Pinned</h4>
                    )}

                    {context?.pinnedNotes.map((n: NoteProps, i) => {
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
            <DragDropContext onDragEnd={handleOnDragEndNotes}>
              <Droppable droppableId="notes">
                {(provided: providedProps) => (
                  <div className={css.notes} ref={provided.innerRef} {...provided.droppableProps}>
                    {context!.notes.length > 0 && context!.pinnedNotes.length > 0 && (
                      <h4 className={css.header}>Others</h4>
                    )}

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

        {context!.notes.length > 0 || context!.pinnedNotes.length > 0 ? (
          <>
            <button id="reset-btn" className={css.reset} onClick={deleteAllNotes}>
              <MdDeleteSweep className={css.icon} />
            </button>
            <ReactTooltip
              style={{ fontSize: "1.0rem", padding: ".4rem .6rem" }}
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
