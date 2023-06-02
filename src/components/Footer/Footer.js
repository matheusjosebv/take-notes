import classNames from "classnames";
import { useContext } from "react";
import ThemeContext from "../../hooks/ThemeContext";
import css from "./Footer.module.scss";

export default function Footer() {
  const { darkTheme } = useContext(ThemeContext);
  const year = new Date().getFullYear();

  return (
    <footer className={classNames(css.root, { [css.darkMode]: darkTheme })}>
      Created by Matheus Venancio @ {year}
    </footer>
  );
}
