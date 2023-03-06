import React, { useRef, useEffect, useCallback } from "react";
import css from "./Note.module.scss";
import { gsap } from "gsap";
import { FaTrashAlt } from "react-icons/fa";

export default function Note({ title, content, onDelete, id, animate }) {
  const boxRef = useRef();

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

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
    <div className={css.root} ref={boxRef} key={id}>
      <h1 className={css.title}>{title}</h1>
      <p className={css.content}>{content}</p>

      <button className={css.button} onClick={handleDelete}>
        <FaTrashAlt className={css.delete} />
      </button>
    </div>
  );
}
