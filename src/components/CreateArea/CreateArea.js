import React, { useState } from "react";
import css from "./CreateArea.module.scss";
import { v4 as uuid } from "uuid";
import { IoIosAdd, IoIosWarning } from "react-icons/io";

const CreateArea = ({ onAdd }) => {
  const [inputNote, setInput] = useState({
    title: "",
    content: "",
    key: "",
    animate: true,
  });
  const [warning, setWarning] = useState(false);
  const characterLimit = 200;

  const handleAddButton = () => {
    if (inputNote.title || inputNote.content) {
      onAdd(inputNote);
      setInput({ title: "", content: "", key: "", animate: true });
      setWarning(false);
    } else if (!inputNote.title && !inputNote.content) {
      setWarning(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (characterLimit - value.length >= 0) {
      setInput((prevNote) => ({
        ...prevNote,
        [name]: value,
        key: uuid(),
      }));
    }
    setWarning(false);
  };

  return (
    <main className={css.root}>
      <div>
        {warning && (
          <p className={css.warning}>
            <IoIosWarning className={css.icon} /> You can't create an empty
            note.
          </p>
        )}
      </div>
      {characterLimit - inputNote.content.length <= 25 && (
        <p className={css.charactersRemaining}>
          You have only {characterLimit - inputNote.content.length} characters
          remaining.
        </p>
      )}
      <form className={css.form} onSubmit={(e) => e.preventDefault()}>
        <input
          className={css.input}
          value={inputNote.title}
          onChange={handleChange}
          name="title"
          placeholder="Title"
        />
        <textarea
          className={css.textarea}
          value={inputNote.content}
          onChange={handleChange}
          name="content"
          placeholder="Description"
          rows="3"
        />
        <button className={css.addButton} onClick={handleAddButton}>
          <IoIosAdd className={css.addIcon} size={32} />
        </button>
      </form>
    </main>
  );
};

export default CreateArea;
