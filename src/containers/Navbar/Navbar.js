import css from "./Navbar.module.scss";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import Context from "../../hooks/Context";
import { useContext, useState } from "react";
import classNames from "classnames";
import Switch from "react-switch";
import useLayout from "../../hooks/useLayout";
import { MdAutoDelete } from "react-icons/md";
import { HiMenu } from "react-icons/hi";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { CgClose } from "react-icons/cg";

const Navbar = () => {
  const layout = useLayout();
  const [sidebar, setSidebar] = useState(false);
  const { darkTheme, toggleTheme, search, setSearch } = useContext(Context);
  const resolvedPath = useResolvedPath("/archive");
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  const handleSidebar = () => {
    setSidebar((prev) => !prev);
  };

  return (
    <nav className={classNames(css.root, { [css.darkMode]: darkTheme })}>
      <div className={css.left}>
        <Link to="/" style={{ textDecoration: "none", color: "none" }}>
          <h1 className={css.title} onClick={() => setSidebar(false)}>
            {layout.desktop ? "Take Notes" : "TN"}
          </h1>
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
          {sidebar ? (
            <CgClose className={css.icon} onClick={handleSidebar} />
          ) : (
            <HiMenu className={css.icon} onClick={handleSidebar} />
          )}
        </div>

        <button className={classNames(css.archive, { [css.active]: isActive })}>
          <Link
            to="/archive"
            style={{ textDecoration: "none", color: "unset" }}
          >
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

      <Sidebar open={sidebar} toggleMenu={handleSidebar} />
    </nav>
  );
};

export default Navbar;
