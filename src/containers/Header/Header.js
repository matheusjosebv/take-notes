import css from "./Header.module.scss";

const Header = () => {
  return (
    <nav className={css.root}>
      <h1 className={css.title}>Take Notes</h1>
    </nav>
  );
};

export default Header;
