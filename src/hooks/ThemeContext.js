import { createContext, useEffect, useState } from "react";
const ThemeContext = createContext();

export default ThemeContext;

export function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState();

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
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
