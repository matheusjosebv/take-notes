import React, { useRef, useState } from "react";
import css from "./CreateArea.module.scss";
import { v4 as uuid } from "uuid";
import { IoIosAdd, IoIosWarning } from "react-icons/io";
import classNames from "classnames";

const CreateArea = ({ onAdd, className }) => {
  const titleRef = useRef();
  const contentRef = useRef();
  const formRef = useRef();
  const [warning, setWarning] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const inputNote = {
      key: uuid(),
      title: titleRef.current.value,
      content: contentRef.current.value,
    };

    if (inputNote.title || inputNote.content) {
      onAdd(inputNote);
      formRef.current.reset();
      setWarning(false);
    } else {
      setWarning(true);
    }
  };

  return (
    <main className={classNames(css.root, className)}>
      <div>
        {warning && (
          <p className={css.warning}>
            <IoIosWarning className={css.icon} /> You can't create an empty
            note.
          </p>
        )}
      </div>

      <form ref={formRef} className={css.form} onSubmit={handleSubmit}>
        <input
          ref={titleRef}
          className={css.input}
          name="title"
          placeholder="Title"
        />
        <textarea
          ref={contentRef}
          className={css.textarea}
          name="content"
          placeholder="Take a note..."
          rows="3"
        />
        <button className={css.addButton} type="submit">
          <IoIosAdd className={css.addIcon} size={32} />
        </button>
      </form>
    </main>
  );
};

export default CreateArea;
