import css from "./Header.module.scss";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import ThemeContext from "../../hooks/ThemeContext";
import { useContext } from "react";
import classNames from "classnames";
import Switch from "react-switch";

const Header = () => {
  const { darkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={classNames(css.root, { [css.darkMode]: darkTheme })}>
      <h1 className={css.title}>Take Notes</h1>

      <button className={css.btn} onClick={toggleTheme}>
        <Switch
          checked={darkTheme || false}
          handleDiameter={24}
          className={css.switch}
          onChange={toggleTheme}
          checkedIcon
          uncheckedIcon
          onColor="#e8eaed"
          offColor="#e8eaed"
          onHandleColor="#202124"
          offHandleColor="#138cf5"
          activeBoxShadow="undefined"
          checkedHandleIcon={<MdOutlineDarkMode className={css.icon} />}
          uncheckedHandleIcon={<MdOutlineLightMode className={css.icon} />}
        />
      </button>
    </nav>
  );
};

export default Header;
