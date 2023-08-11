import classNames from "classnames";
import Context from "../../hooks/Context";
import css from "./PageArchive.module.scss";
import { useContext, useCallback } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

import Note from "../../components/Note/Note";

import { MdDeleteSweep } from "react-icons/md";

export default function PageArchive() {
  const context = useContext(Context);

  const recoveryNote = useCallback(
    (key) => {
      const noteToRecover = context?.deletedNotes.find((d) => d.key === key);
      const newDeletedNotes = context?.deletedNotes.filter((d) => d.key !== key);

      context?.setDeletedNotes(newDeletedNotes as []);
      context?.setNotes((prevNotes) => [...prevNotes, noteToRecover!]);
    },
    [context]
  );

  const permanentDeleteNote = useCallback(
    (key) => {
      const newDeletedNotes = context?.deletedNotes.filter((d) => d.key !== key);
      if (window.confirm("Are you sure you want to delete permanently this note?")) {
        context?.setDeletedNotes(newDeletedNotes as []);
      }
    },
    [context]
  );

  return (
    <main className={classNames(css.root, { [css.darkMode]: context?.darkTheme })}>
      <header className={css.header}>
        <h1 className={css.title}>Archive</h1>
      </header>

      <div className={css.notes}>
        {context?.deletedNotes.length !== 0 ? (
          context?.deletedNotes.map((n) => (
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
              infoButton={false}
            />
          ))
        ) : (
          <p className={css.emptyNotes}>No notes deleted in the archive</p>
        )}
      </div>

      {context?.deletedNotes.length && (
        <>
          <button
            id="reset-btn"
            className={css.deleteAllNotes}
            onClick={() => {
              if (window.confirm("Do you want to delete permanently all notes?")) {
                context?.setDeletedNotes([]);
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
