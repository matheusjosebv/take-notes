import { v4 as uuid } from "uuid";
import classNames from "classnames";
import css from "./CreateArea.module.scss";
import ThemeContext from "../../hooks/Context";
import { Tooltip as ReactTooltip } from "react-tooltip";
import React, { useContext, useRef, useState } from "react";

import jokes from "../../data/jokes";

import { BiCopy, BiImageAlt } from "react-icons/bi";
import { MdOutlinePalette } from "react-icons/md";
import { IoIosAdd, IoIosWarning } from "react-icons/io";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";

interface Props {
  onAdd: any;
  className: string;
}

const CreateArea = ({ onAdd, className }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const [isCopy, setIsCopy] = useState<string>("copy");
  const [warning, setWarning] = useState<boolean>(false);
  const context = useContext(ThemeContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const inputNote = {
      key: uuid(),
      pinned: false,
      edited: false,
      createdAt: new Date(),
      title: titleRef.current?.value,
      text: textRef.current?.value,
    };

    if (inputNote.title || inputNote.text) {
      onAdd(inputNote);
      formRef.current?.reset();
      setWarning(false);
    } else {
      setWarning(true);
    }
  };

  const handleRandomPrompt = () => {
    const random = Math.floor(Math.random() * jokes.length);
    titleRef.current!.value = jokes[random].title;
    textRef.current!.value = jokes[random].text;
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(` ${textRef.current?.value}`);
    setIsCopy("Copied!");
    setInterval(() => {
      setIsCopy("Copy");
    }, 4010);
  };

  return (
    <main className={classNames(css.root, { [css.darkMode]: context?.darkTheme }, className)}>
      <div>
        {warning && (
          <p className={css.warning}>
            <IoIosWarning className={css.icon} /> You can't create an empty note.
          </p>
        )}
      </div>

      <form ref={formRef} className={css.form} onSubmit={handleSubmit}>
        <input name="title" ref={titleRef} placeholder="Title" className={css.input} />

        <>
          <button
            id="random-btn"
            type="button"
            className={classNames(css.randomGeneratorBtn, "btn")}
            onClick={handleRandomPrompt}
          >
            <GiPerspectiveDiceSixFacesRandom className="icon" size={32} />
          </button>
          <ReactTooltip
            style={{ fontSize: "10px", padding: "4px 6px" }}
            anchorSelect="#random-btn"
            place="top"
            content="Random text"
            noArrow
            delayShow={100}
            delayHide={2000}
          />
        </>

        <div className={css.textEditor}>
          <textarea
            rows={3}
            name="text"
            ref={textRef}
            className={css.textarea}
            placeholder="Take a note..."
          />

          <div className={css.editorBtns}>
            <>
              <button
                id="copy-btn"
                type="button"
                className={classNames(css.copyBtn, "btn")}
                onClick={handleCopyPrompt}
              >
                <BiCopy className={"icon"} size={32} />
              </button>
              <ReactTooltip
                style={{ fontSize: "10px", padding: "4px 6px" }}
                anchorSelect="#copy-btn"
                place="top"
                content={isCopy}
                noArrow
                delayShow={100}
              />
            </>
          </div>
        </div>

        <div className={css.bottomBtns}>
          {/* <>
            <button
              id="background-btn"
              type="button"
              className={classNames(css.backgroundColor, "btn")}
            >
              <MdOutlinePalette className={"icon"} size={32} />
            </button>
            <ReactTooltip
              style={{ fontSize: "10px", padding: "4px 6px" }}
              anchorSelect="#background-btn"
              place="top"
              content="Background colors"
              noArrow
              delayShow={100}
            />
          </> */}

          {/* <>
            <button
              id="img-btn"
              type="button"
              className={classNames(css.imgAttachment, "btn")}
              // onClick={handleimgColors}
            >
              <BiImageAlt className={"icon"} size={32} />
            </button>
            <ReactTooltip
              style={{ fontSize: "10px", padding: "4px 6px" }}
              anchorSelect="#img-btn"
              place="top"
              content="Image attachment"
              noArrow
              delayShow={100}
            />
          </> */}

          <button className={classNames(css.addBtn, "btn")} type="submit">
            <IoIosAdd className={"icon"} size={20} />
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateArea;
