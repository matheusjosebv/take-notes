import { gsap } from "gsap";
import classNames from "classnames";
import css from "./Note.module.scss";
import { FaTrashAlt } from "react-icons/fa";
import {
  BsPinAngle,
  BsFillPenFill,
  BsPinAngleFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import React, { useRef, useEffect, useContext } from "react";
import { format, parseISO } from "date-fns";
import ThemeContext from "../../hooks/ThemeContext";

export default function Note({
  id,
  text,
  title,
  edited,
  pinned,
  animate,
  createdAt,
  handlePin,
  handleEdit,
  handleInfo,
  handleDelete,
}) {
  const boxRef = useRef();
  const { darkTheme } = useContext(ThemeContext);

  useEffect(() => {
    const box = boxRef.current;
    let tl;
    tl = gsap.timeline().set(box, { opacity: 1 });
    if (animate) tl.from(box, { ease: "expo", scaleY: 0, duration: 0.66 });

    return () => {
      if (tl) tl.kill();
    };
  }, [animate]);

  return (
    <div
      key={id}
      ref={boxRef}
      className={classNames(css.root, { [css.darkMode]: darkTheme })}
    >
      <div className={css.container}>
        <div className={css.content}>
          <h1 className={css.title}>{title}</h1>
          <p className={css.text}>{text}</p>
        </div>

        <div className={css.sideBtns}>
          <button className={css.btn}>
            <BsThreeDotsVertical className={css.icon} onClick={handleInfo} />
          </button>
          <button className={css.btn} onClick={handlePin}>
            {pinned ? (
              <BsPinAngleFill className={classNames(css.icon, css.pinned)} />
            ) : (
              <BsPinAngle className={css.icon} />
            )}
          </button>
        </div>
      </div>

      <div className={css.bottom}>
        <div className={css.infos}>
          <p className={css.edited}>{edited && "(edited)"}</p>
          <p className={css.date}>
            {format(
              typeof createdAt === "string" ? parseISO(createdAt) : createdAt,
              "MMMM do, yyyy H:mma",
              {
                awareOfUnicodeTokens: true,
              }
            )}
          </p>
        </div>

        <div className={css.btns}>
          <button className={css.btn} onClick={handleEdit}>
            <BsFillPenFill className={css.icon} />
          </button>
          <button className={css.btn} onClick={handleDelete}>
            <FaTrashAlt className={classNames(css.icon, css.delete)} />
          </button>
        </div>
      </div>
    </div>
  );
}
