import { gsap } from "gsap";
import classNames from "classnames";
import css from "./Note.module.scss";
import Context from "../../hooks/Context";
import { format, parseISO } from "date-fns";
import { Tooltip as ReactTooltip } from "react-tooltip";
import React, { useRef, useState, useEffect, useContext } from "react";

import {
  BsPinAngle,
  BsFillPenFill,
  BsPinAngleFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";

const Note = React.forwardRef(
  (
    {
      id,
      text,
      title,
      image,
      edited,
      pinned,
      animate,
      createdAt,
      handlePin,
      infoButton,
      handleEdit,
      handleDelete,
      handleRecovery,
      handleDuplicate,
      handlePermanentDelete,
      ...dndProps
    },
    ref
  ) => {
    const boxRef = useRef();
    const dropDownRef = useRef();
    const moreBtnRef = useRef();
    const { darkTheme } = useContext(Context);
    const [showInfo, setShowInfo] = useState(false);

    useEffect(() => {
      let outsideClick = (e) => {
        if (e !== null || !dropDownRef.current.contains(e.target)) {
          setShowInfo(false);
          console.log("clicked");
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
      <div ref={ref} {...dndProps}>
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
            <div className={css.imgWrapper}>
              {image && <img className={css.img} src={image} alt="" />}
            </div>

            <div className={css.content}>
              <h1 className={css.title}>{title}</h1>
              <p
                className={css.text}
                dangerouslySetInnerHTML={{ __html: text }}
              ></p>
            </div>

            <div className={css.sideBtns}>
              {infoButton && (
                <div ref={moreBtnRef}>
                  <button id="more-btn" className={css.btn}>
                    <BsThreeDotsVertical
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
                  <ReactTooltip
                    style={{ fontSize: "10px", padding: "4px 6px" }}
                    anchorSelect="#more-btn"
                    place="top"
                    content="More"
                    noArrow
                    delayShow={100}
                  />
                </div>
              )}

              {handlePin && (
                <>
                  <button id="pin-btn" className={css.btn} onClick={handlePin}>
                    {pinned ? (
                      <BsPinAngleFill
                        className={classNames(css.icon, css.pinned)}
                      />
                    ) : (
                      <BsPinAngle className={css.icon} />
                    )}
                  </button>
                  <ReactTooltip
                    style={{ fontSize: "10px", padding: "4px 6px" }}
                    anchorSelect="#pin-btn"
                    place="top"
                    content="Pin Note"
                    noArrow
                    delayShow={100}
                  />
                </>
              )}
            </div>
          </div>

          <div className={css.bottom}>
            <div className={css.infos}>
              <p className={css.edited}>{edited && "(edited)"}</p>
              <p className={css.date}>
                {format(
                  typeof createdAt === "string"
                    ? parseISO(createdAt)
                    : createdAt,
                  "MMMM do, yyyy H:mma",
                  {
                    awareOfUnicodeTokens: true,
                  }
                )}
              </p>
            </div>

            <div className={css.btns}>
              {handleEdit && (
                <>
                  <button
                    className={classNames(css.btn, css.edit)}
                    onClick={handleEdit}
                    id="edit-btn"
                  >
                    <BsFillPenFill className={css.icon} />
                  </button>
                  <ReactTooltip
                    style={{ fontSize: "10px", padding: "4px 6px" }}
                    anchorSelect="#edit-btn"
                    place="top"
                    content="Edit"
                    noArrow
                    delayShow={100}
                  />
                </>
              )}

              {handleDelete && (
                <>
                  <button
                    className={classNames(css.btn, css.delete)}
                    onClick={handleDelete}
                    id="delete-btn"
                  >
                    <FaTrashAlt className={classNames(css.icon, css.delete)} />
                  </button>
                  <ReactTooltip
                    style={{ fontSize: "10px", padding: "4px 6px" }}
                    anchorSelect="#delete-btn"
                    place="top"
                    content="Delete"
                    noArrow
                    delayShow={100}
                  />
                </>
              )}

              {handleRecovery && (
                <>
                  <button
                    className={classNames(css.btn, css.recover)}
                    onClick={handleRecovery}
                    id="recover-btn"
                  >
                    <MdOutlineSettingsBackupRestore
                      className={classNames(css.icon, css.recover)}
                      // style={{ width: "16px", height: "16px" }}
                    />
                  </button>
                  <ReactTooltip
                    style={{ fontSize: "10px", padding: "4px 6px" }}
                    anchorSelect="#recover-btn"
                    place="top"
                    content="Unarchive"
                    noArrow
                    delayShow={100}
                  />
                </>
              )}

              {handlePermanentDelete && (
                <>
                  <button
                    className={classNames(css.btn, css.permanentDelete)}
                    onClick={handlePermanentDelete}
                    id="permanent-delete-btn"
                  >
                    <FaTrashAlt
                      className={classNames(css.icon, css.permanentDelete)}
                    />
                  </button>
                  <ReactTooltip
                    style={{ fontSize: "10px", padding: "4px 6px" }}
                    anchorSelect="#permanent-delete-btn"
                    place="top"
                    content="Delete permanently"
                    noArrow
                    delayShow={100}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Note;
