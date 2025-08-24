import React, { useRef } from "react";
import { FilePlus2 } from "lucide-react";
import { Button } from "../index";

const NoteSave = () => {
  const textAreaRef = useRef();
  function handleInput(e) {
    const textarea = textAreaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  return (
    <div className="w-full rounded-2xl bg-amber-100 shadow-2xl flex flex-col gap-3 py-8 px-1">
      <div className="flex items-center gap-3">
        <input
          type="text"
          name="title"
          className="outline-none text-xl w-full"
          placeholder="Title"
        />
        <Button className="border-0 hover:bg-amber-300 duration-300">
          <FilePlus2 />
        </Button>
      </div>

      <textarea
        ref={textAreaRef}
        name="content"
        placeholder="Take a note.."
        rows={2}
        className="outline-none text-base h-fit overflow-hidden resize-none"
        onInput={handleInput}
      />
    </div>
  );
};

export default NoteSave;
