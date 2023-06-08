import { useContext, useCallback } from "react";
import classNames from "classnames";
import Context from "../../hooks/Context";
import css from "./PageArchive.module.scss";

import Note from "../../components/Note/Note";

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
            />
          ))
        ) : (
          <p className={css.emptyNotes}>No notes deleted in the archive</p>
        )}
      </div>
    </main>
  );
}
