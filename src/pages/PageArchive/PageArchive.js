import classNames from "classnames";
import Context from "../../hooks/Context";
import css from "./PageArchive.module.scss";
import { useContext, useCallback } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

import Note from "../../components/Note/Note";

import { MdDeleteSweep } from "react-icons/md";

export default function PageArchive() {
  const { darkTheme, setNotes, deletedNotes, setDeletedNotes } =
    useContext(Context);

  const recoveryNote = useCallback(
    (key) => {
      const noteToRecover = deletedNotes.find((d) => d.key === key);
      const newDeletedNotes = deletedNotes.filter((d) => d.key !== key);

      setDeletedNotes(newDeletedNotes);
      setNotes((prev) => [...prev, noteToRecover]);
    },
    [deletedNotes, setDeletedNotes, setNotes]
  );

  const permanentDeleteNote = useCallback(
    (key) => {
      const newDeletedNotes = deletedNotes.filter((d) => d.key !== key);
      if (
        window.confirm("Are you sure you want to delete permanently this note?")
      ) {
        setDeletedNotes(newDeletedNotes);
      }
    },
    [deletedNotes, setDeletedNotes]
  );

  return (
    <main className={classNames(css.root, { [css.darkMode]: darkTheme })}>
      <header className={css.header}>
        <h1 className={css.title}>Archive</h1>
      </header>

      <div className={css.notes}>
        {deletedNotes.length !== 0 ? (
          deletedNotes.map((n) => (
            <Note
              id={n.key}
              key={n.key}
              text={n.text}
              title={n.title}
              edited={n.edited}
              pinned={n.pinned}
              animate={n.animate}
              createdAt={n.createdAt}
              handleRecovery={() => recoveryNote(n.key)}
              handlePermanentDelete={() => permanentDeleteNote(n.key)}
            />
          ))
        ) : (
          <p className={css.emptyNotes}>No notes deleted in the archive</p>
        )}
      </div>

      {deletedNotes.length && (
        <>
          <button
            id="reset-btn"
            className={css.deleteAllNotes}
            onClick={() => {
              if (
                window.confirm("Do you want to delete permanently all notes?")
              ) {
                setDeletedNotes([]);
              }
            }}
          >
            <MdDeleteSweep className={css.icon} />
          </button>
          <ReactTooltip
            style={{ fontSize: "10px", padding: "4px 6px" }}
            anchorSelect="#reset-btn"
            place="top"
            content="Delete all archived notes"
            noArrow
            delayShow={100}
          />
        </>
      )}
    </main>
  );
}
