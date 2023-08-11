import Switch from "react-switch";
import classNames from "classnames";
import css from "./Sidebar.module.scss";
import Context from "../../hooks/Context";
import { useContext, useRef } from "react";

import CustomRoute from "../../components/CustomRoute/CustomRoute";

import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

interface sidebarProps {
  isOpen: boolean;
  toggleMenu: React.MouseEventHandler;
}

const Sidebar = ({ isOpen, toggleMenu }: sidebarProps) => {
  const context = useContext(Context);
  const sidebarRef = useRef<HTMLElement | null>(null);

  return (
    <nav
      className={classNames(
        css.root,
        { [css.isOpen]: isOpen },
        { [css.darkMode]: context?.darkTheme }
      )}
      ref={sidebarRef}
    >
      <div className={css.container}>
        <CustomRoute name="home" to="/" className={css.route} onClick={toggleMenu} />
        <CustomRoute name="archive" to="/archive" className={css.route} onClick={toggleMenu} />

        <button className={css.theme} onClick={context?.toggleTheme}>
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
      </div>
    </nav>
  );
};

export default Sidebar;
