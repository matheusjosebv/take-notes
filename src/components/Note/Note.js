import { gsap } from "gsap";
import classNames from "classnames";
import css from "./Note.module.scss";
import Context from "../../hooks/Context";
import { format, parseISO } from "date-fns";
import React, { useRef, useEffect, useContext, useState } from "react";

import {
  BsPinAngle,
  BsFillPenFill,
  BsPinAngleFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";

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
  handleDelete,
  handleRecovery,
  handleDuplicate,
}) {
  const boxRef = useRef();
  const getInfoRef = useRef();
  const dropDownRef = useRef();
  const { darkTheme } = useContext(Context);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    let outsideClick = (e) => {
      if (!dropDownRef.current.contains(e.target) || !getInfoRef.current) {
        setShowInfo(false);
      }
    };
    document.addEventListener("mousedown", outsideClick);
    return () => {
      document.removeEventListener("mousedown", outsideClick);
    };
  }, [showInfo]);

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
      className={classNames(
        css.root,
        { [css.darkMode]: darkTheme },
        { [css.isPinned]: pinned }
      )}
    >
      <div className={css.container}>
        <div className={css.content}>
          <h1 className={css.title}>{title}</h1>
          <p
            className={css.text}
            dangerouslySetInnerHTML={{ __html: text }}
          ></p>
        </div>

        <div className={css.sideBtns}>
          <button className={css.btn}>
            <BsThreeDotsVertical
              ref={getInfoRef}
              className={css.icon}
              onClick={() => setShowInfo((prev) => !prev)}
            />
            {showInfo && (
              <div className={css.dropDown} ref={dropDownRef}>
                <p className={css.info}>Date</p>
                <p className={css.info} onClick={handleDelete}>
                  Delete
                </p>
                <p className={css.info} onClick={handleDuplicate}>
                  Duplicate
                </p>
                <p
                  className={css.info}
                  onClick={() => {
                    navigator.clipboard.writeText(`${title} ${text}`);
                    setShowInfo(false);
                  }}
                >
                  Copy
                </p>
              </div>
            )}
          </button>

          {handlePin && (
            <button className={css.btn} onClick={handlePin}>
              {pinned ? (
                <BsPinAngleFill className={classNames(css.icon, css.pinned)} />
              ) : (
                <BsPinAngle className={css.icon} />
              )}
            </button>
          )}
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
          {handleEdit && (
            <button className={css.btn} onClick={handleEdit}>
              <BsFillPenFill className={css.icon} />
            </button>
          )}

          {handleDelete && (
            <button className={css.btn} onClick={handleDelete}>
              <FaTrashAlt className={classNames(css.icon, css.delete)} />
            </button>
          )}

          {handleRecovery && (
            <button className={css.btn} onClick={handleRecovery}>
              <p className={css.recover}>Unarchive</p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
