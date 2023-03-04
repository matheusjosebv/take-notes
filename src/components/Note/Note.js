import React, { useRef, useEffect, useCallback } from "react";
import css from "./Note.module.scss";
import { gsap } from "gsap";
import { FaTrashAlt } from "react-icons/fa";
import { BsPenFill } from "react-icons/bs";

export default function Note({
  title,
  content,
  onDelete,
  onEdit,
  id,
  animate,
}) {
  const boxRef = useRef();

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  const handleEdit = useCallback(() => {
    onEdit(id);
  }, [id, onEdit]);

  useEffect(() => {
    const box = boxRef.current;
    let tl;
    if (animate) {
      tl = gsap
        .timeline()
        .from(box, { ease: "expo", scaleY: 0, duration: 0.66 });
    }

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
      <button className={css.button} onClick={handleEdit}>
        <BsPenFill className={css.edit} />
      </button>
    </div>
  );
}
