import classNames from "classnames";
import css from "./CustomRoute.module.scss";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useContext } from "react";
import Context from "../../hooks/Context";

interface Props {
  className: string;
  to: any;
  name: string;
  onClick: React.MouseEventHandler;
}

export default function CustomRoute({ className, to, name, onClick, ...props }: Props) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  const context = useContext(Context);

  return (
    <div
      className={classNames(
        css.root,
        className,
        { [css.active]: isActive },
        { [css.darkMode]: context?.darkTheme }
      )}
      onClick={onClick}
    >
      <Link to={to} {...props} style={{ textDecoration: "none" }}>
        <p className={classNames(css.route)}>{name}</p>
        <div className={css.underline} />
      </Link>
    </div>
  );
}
