import classNames from "classnames";
import { useContext } from "react";
import Context from "../../hooks/Context";

import css from "./Footer.module.scss";

function Footer() {
  const context = useContext(Context);

  const year: number = new Date().getFullYear();

  return (
    <footer className={classNames(css.root, { [css.darkMode]: context?.darkTheme })}>
      Created by Matheus Venancio @ {year}
    </footer>
  );
}

export default Footer;
