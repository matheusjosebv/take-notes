import css from "./Navbar.module.scss";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import Context from "../../hooks/Context";
import { useContext, useState } from "react";
import classNames from "classnames";
import Switch from "react-switch";
import useLayout from "../../hooks/useLayout";
import { MdAutoDelete } from "react-icons/md";
import { HiMenu } from "react-icons/hi";
import { Tooltip as ReactTooltip } from "react-tooltip";

import { Link, useMatch, useResolvedPath } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { CgClose } from "react-icons/cg";

const Navbar = () => {
  const layout = useLayout();
  const [sidebar, setSidebar] = useState<boolean>(false);
  const context = useContext(Context);
  const resolvedPath = useResolvedPath("/archive");
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  const handleSidebar = () => {
    setSidebar((prev) => !prev);
  };

  return (
    <nav className={classNames(css.root, { [css.darkMode]: context?.darkTheme })}>
      <div className={css.left}>
        <Link to="/" style={{ textDecoration: "none", color: "none" }}>
          <h1 className={css.title} onClick={() => setSidebar(false)}>
            {layout.desktop ? "Take Notes" : "TN"}
          </h1>
        </Link>
      </div>

      <div className={css.middle}>
        <input
          name="search"
          value={context?.search}
          className={css.input}
          placeholder="Search note"
          onChange={(e) => context?.setSearch(e.target.value)}
          disabled={sidebar}
        />
        {context?.search && (
          <button className={css.clearInput} onClick={() => context?.setSearch("")}>
            <CgClose className={css.icon} />
          </button>
        )}
      </div>

      <div className={css.right}>
        <div className={css.mobileMenu}>
          {sidebar ? (
            <CgClose className={css.icon} onClick={handleSidebar} />
          ) : (
            <HiMenu className={css.icon} onClick={handleSidebar} />
          )}
        </div>

        <>
          <Link to="/archive" style={{ textDecoration: "none", color: "unset" }}>
            <button
              id="archive-btn"
              className={classNames(css.archive, { [css.active]: isActive })}
            >
              <MdAutoDelete className={css.icon} />
            </button>
          </Link>

          <ReactTooltip
            style={{ fontSize: "1.0rem", padding: ".4rem .6rem" }}
            anchorSelect="#archive-btn"
            place="top"
            content="Archive"
            noArrow
            delayShow={100}
          />
        </>

        <>
          <button id="theme-btn" className={css.theme} onClick={context?.toggleTheme}>
            <Switch
              checked={context?.darkTheme || false}
              handleDiameter={24}
              className={css.switch}
              onChange={() => context?.toggleTheme}
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
          <ReactTooltip
            noArrow
            delayShow={90}
            place="bottom"
            content="Switch Theme"
            anchorSelect="#theme-btn"
            style={{ fontSize: "1.0rem", padding: ".4rem .6rem" }}
          />
        </>
      </div>

      <Sidebar isOpen={sidebar} toggleMenu={handleSidebar} />
    </nav>
  );
};

export default Navbar;
