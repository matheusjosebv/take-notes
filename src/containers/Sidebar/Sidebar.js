import css from "./Sidebar.module.scss";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import Context from "../../hooks/Context";
import { useContext, useEffect, useRef } from "react";
import classNames from "classnames";
import Switch from "react-switch";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import CustomRoute from "../../components/CustomRoute/CustomRoute";

const Sidebar = ({ open, toggleMenu }) => {
  const { darkTheme, toggleTheme } = useContext(Context);

  const startAnim = useRef();
  const sidebarRef = useRef();

  useEffect(() => {
    if (open) {
      open ? startAnim.current.play() : startAnim.current.reverse();
    }
  }, [open]);

  useEffect(() => {
    startAnim.current = gsap.timeline({ paused: true });
    startAnim.current.set(sidebarRef.current, { opacity: 1 });
  }, []);
  return (
    <nav
      className={classNames(
        css.root,
        { [css.open]: open },
        { [css.darkMode]: darkTheme }
      )}
      ref={sidebarRef}
    >
      <div className={css.container}>
        <CustomRoute
          name="home"
          to="/"
          className={css.route}
          onClick={toggleMenu}
        />
        <CustomRoute
          name="archive"
          to="/archive"
          className={css.route}
          onClick={toggleMenu}
        />

        <button className={css.theme} onClick={toggleTheme}>
          <Switch
            checked={darkTheme || false}
            handleDiameter={24}
            className={css.switch}
            onChange={toggleTheme}
            onClick={toggleMenu}
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
