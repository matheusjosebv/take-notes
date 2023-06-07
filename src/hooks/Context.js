import { createContext, useEffect, useState } from "react";
const Context = createContext();

export default Context;

export function Provider({ children }) {
  const [darkTheme, setDarkTheme] = useState();
  const [search, setSearch] = useState("");

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
    <Context.Provider value={{ darkTheme, toggleTheme, search, setSearch }}>
      {children}
    </Context.Provider>
  );
}
