import { createContext, useEffect, useState, ReactNode } from "react";
import { useLocalStorage } from "./useLocalStorage";

import { NoteProps, ContextValue } from "../types/types";

const Context = createContext<ContextValue | undefined>(undefined);

export default Context;

interface ProviderProps {
  children: ReactNode;
}

export function Provider({ children }: ProviderProps) {
  const [storageNotes, setStorageNotes] = useLocalStorage("notes", []);
  const [storageDeletedNotes, setStorageDeletedNotes] = useLocalStorage("deletedNotes", []);
  const [notes, setNotes] = useState<NoteProps[]>(storageNotes);
  const [deletedNotes, setDeletedNotes] = useState<NoteProps[]>(storageDeletedNotes);

  const [search, setSearch] = useState<string>("");
  const [darkTheme, setDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    setStorageNotes(notes.map((n) => ({ ...n, animate: false })));
    setStorageDeletedNotes(deletedNotes.map((n) => ({ ...n, animate: false })));
  }, [deletedNotes, notes, setStorageDeletedNotes, setStorageNotes]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    if (mq.matches) {
      setDarkTheme(true);
    }

    mq.addEventListener("change", (evt) => setDarkTheme(evt.matches));
  }, []);

  const toggleTheme = () => {
    setDarkTheme((prev) => !prev);
  };

  const contextValue: ContextValue = {
    notes,
    setNotes,
    search,
    setSearch,
    darkTheme,
    toggleTheme,
    deletedNotes,
    setDeletedNotes,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
