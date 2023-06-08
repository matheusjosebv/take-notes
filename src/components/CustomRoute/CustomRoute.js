import classNames from "classnames";
import css from "./CustomRoute.module.scss";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useContext } from "react";
import Context from "../../hooks/Context";

export default function CustomRoute({ className, to, name, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  const { darkTheme } = useContext(Context);

  return (
    <div
      className={classNames(
        css.root,
        className,
        { [css.active]: isActive },
        { [css.darkMode]: darkTheme }
      )}
    >
      <Link to={to} {...props} style={{ textDecoration: "none" }}>
        <p className={classNames(css.route)}>{name}</p>
        <div className={css.underline} />
      </Link>
    </div>
  );
}
