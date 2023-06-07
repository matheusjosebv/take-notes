import classNames from "classnames";
import { useContext } from "react";
import Context from "../../hooks/Context";
import css from "./Footer.module.scss";

export default function Footer() {
  const { darkTheme } = useContext(Context);
  const year = new Date().getFullYear();

  return (
    <footer className={classNames(css.root, { [css.darkMode]: darkTheme })}>
      Created by Matheus Venancio @ {year}
    </footer>
  );
}
