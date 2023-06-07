import css from "./Header.module.scss";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import Context from "../../hooks/Context";
import { useContext } from "react";
import classNames from "classnames";
import Switch from "react-switch";
import useLayout from "../../hooks/useLayout";
import { MdAutoDelete } from "react-icons/md";
import { HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";

const Header = () => {
  const { darkTheme, toggleTheme, search, setSearch } = useContext(Context);
  const layout = useLayout();

  return (
    <nav className={classNames(css.root, { [css.darkMode]: darkTheme })}>
      <div className={css.left}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1 className={css.title}>{layout.desktop ? "Take Notes" : "TN"}</h1>
        </Link>
      </div>

      <input
        name="search"
        value={search}
        className={css.input}
        placeholder="Search note"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className={css.right}>
        <div className={css.mobileMenu}>
          <HiMenu className={css.icon} />
        </div>

        <button className={css.archive}>
          <Link to="/archive">
            <MdAutoDelete className={css.icon} />
          </Link>
        </button>

        <button className={css.theme} onClick={toggleTheme}>
          <Switch
            checked={darkTheme || false}
            handleDiameter={24}
            className={css.switch}
            onChange={toggleTheme}
            checkedIcon
            uncheckedIcon
            onColor="#e8eaed"
            offColor="#fff"
            onHandleColor="#202124"
            offHandleColor="#138cf5"
            activeBoxShadow="undefined"
            checkedHandleIcon={<MdOutlineDarkMode className={css.icon} />}
            uncheckedHandleIcon={<MdOutlineLightMode className={css.icon} />}
          />
        </button>
      </div>
    </nav>
  );
};

export default Header;
