import { v4 as uuid } from "uuid";
import classNames from "classnames";
import css from "./CreateArea.module.scss";
import ThemeContext from "../../hooks/Context";
import React, { useContext, useRef, useState } from "react";

import jokes from "../../data/jokes";
import { IoIosAdd, IoIosWarning } from "react-icons/io";
import { BiCopy } from "react-icons/bi";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";

const CreateArea = ({ onAdd, className }) => {
  const formRef = useRef();
  const textRef = useRef();
  const titleRef = useRef();
  const [warning, setWarning] = useState(false);
  const { darkTheme } = useContext(ThemeContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const inputNote = {
      key: uuid(),
      pinned: false,
      edited: false,
      createdAt: new Date(),
      title: titleRef.current.value,
      text: textRef.current.value,
    };

    if (inputNote.title || inputNote.text) {
      onAdd(inputNote);
      formRef.current.reset();
      setWarning(false);
    } else {
      setWarning(true);
    }
  };

  const handleRandomPrompt = () => {
    const random = Math.floor(Math.random() * jokes.length);
    titleRef.current.value = jokes[random].title;
    textRef.current.value = jokes[random].text;
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(
      `${titleRef.current.value} ${textRef.current.value}`
    );
  };

  return (
    <main
      className={classNames(css.root, { [css.darkMode]: darkTheme }, className)}
    >
      <div>
        {warning && (
          <p className={css.warning}>
            <IoIosWarning className={css.icon} /> You can't create an empty
            note.
          </p>
        )}
      </div>

      <div className={css.formWrapper}>
        <form ref={formRef} className={css.form} onSubmit={handleSubmit}>
          <input
            name="title"
            ref={titleRef}
            placeholder="Title"
            className={css.input}
          />
          <textarea
            rows="3"
            name="text"
            ref={textRef}
            className={css.textarea}
            placeholder="Take a note..."
          />

          <button className={css.addBtn} type="submit">
            <IoIosAdd className={css.icon} size={32} />
          </button>

          <button
            type="button"
            className={css.randomBtn}
            onClick={handleRandomPrompt}
          >
            <GiPerspectiveDiceSixFacesRandom className={css.icon} size={32} />
          </button>

          <button
            type="button"
            className={css.copyBtn}
            onClick={handleCopyPrompt}
          >
            <BiCopy className={css.icon} size={32} />
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateArea;
