import { v4 as uuid } from "uuid";
import classNames from "classnames";
import css from "./CreateArea.module.scss";
import ThemeContext from "../../hooks/Context";
import { Tooltip as ReactTooltip } from "react-tooltip";
import React, { useContext, useRef, useState } from "react";

import jokes from "../../data/jokes";

import { BiCopy } from "react-icons/bi";
import { MdFormatBold } from "react-icons/md";
import { IoIosAdd, IoIosWarning } from "react-icons/io";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { AiOutlineItalic, AiOutlineUnderline } from "react-icons/ai";

const CreateArea = ({ onAdd, className }) => {
  const formRef = useRef();
  const textRef = useRef();
  const titleRef = useRef();
  const [isCopy, setIsCopy] = useState("copy");
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
    navigator.clipboard.writeText(` ${textRef.current.value}`);
    setIsCopy("Copied!");
    setInterval(() => {
      setIsCopy("Copy");
    }, 4010);
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

      <form ref={formRef} className={css.form} onSubmit={handleSubmit}>
        <input
          name="title"
          ref={titleRef}
          placeholder="Title"
          className={css.input}
        />

        <>
          <button
            id="random-btn"
            type="button"
            className={css.randomGeneratorBtn}
            onClick={handleRandomPrompt}
          >
            <GiPerspectiveDiceSixFacesRandom className={css.icon} size={32} />
          </button>
          <ReactTooltip
            style={{ fontSize: "10px", padding: "4px 6px" }}
            anchorSelect="#random-btn"
            place="top"
            content="Random text"
            noArrow
            delayShow={100}
            // delayHide={2000}
          />
        </>

        <div className={css.textEditor}>
          <textarea
            rows="3"
            name="text"
            ref={textRef}
            className={css.textarea}
            placeholder="Take a note..."
          />

          <div className={css.editorBtns}>
            {/* 
            <button
              type="button"
              className={css.btn}
              onClick={handleCopyPrompt}
            >
              <AiOutlineUnderline className={css.icon} size={32} />
            </button>

            <button
              type="button"
              className={css.btn}
              onClick={handleCopyPrompt}
            >
              <MdFormatBold className={css.icon} size={32} />
            </button>

            <button
              type="button"
              className={css.btn}
              onClick={handleCopyPrompt}
            >
              <AiOutlineItalic className={css.icon} size={32} />
            </button>

          */}
            <>
              <button
                id="copy-btn"
                type="button"
                className={css.btn}
                onClick={handleCopyPrompt}
              >
                <BiCopy className={css.icon} size={32} />
              </button>
              <ReactTooltip
                style={{ fontSize: "10px", padding: "4px 6px" }}
                anchorSelect="#copy-btn"
                place="top"
                content={isCopy}
                noArrow
                delayShow={100}
                // delayHide={2000}
              />
            </>
          </div>
        </div>

        <button className={css.addBtn} type="submit">
          <IoIosAdd className={css.icon} size={20} />
        </button>
      </form>
    </main>
  );
};

export default CreateArea;
