import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
const Context = createContext();

export default Context;

export function Provider({ children }) {
  const [storageNotes, setStorageNotes] = useLocalStorage("notes", []);
  const [storageDeletedNotes, setStorageDeletedNotes] = useLocalStorage(
    "deletedNotes",
    []
  );
  const [notes, setNotes] = useState(storageNotes);
  const [deletedNotes, setDeletedNotes] = useState(storageDeletedNotes);

  const [search, setSearch] = useState("");
  const [darkTheme, setDarkTheme] = useState();

  useEffect(() => {
    setStorageNotes(notes.map((n) => ({ ...n, animate: false })));
    setStorageDeletedNotes(deletedNotes.map((n) => ({ ...n, animate: false })));
  }, [deletedNotes, notes, setStorageDeletedNotes, setStorageNotes]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    if (mq.matches) {
      setDarkTheme(true);
    }

    // This callback will fire if the perferred color scheme changes without a reload
    mq.addEventListener("change", (evt) => setDarkTheme(evt.matches));
  }, []);

  const toggleTheme = () => {
    setDarkTheme((prev) => !prev);
  };

  return (
    <Context.Provider
      value={{
        notes,
        setNotes,
        search,
        setSearch,
        darkTheme,
        toggleTheme,
        deletedNotes,
        setDeletedNotes,
      }}
    >
      {children}
    </Context.Provider>
  );
}
