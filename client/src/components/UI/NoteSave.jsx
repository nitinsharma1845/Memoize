import React, { useRef, useState } from "react";
import { FilePlus2, LucideTableCellsSplit } from "lucide-react";
import { Button } from "../index";
import toast from "react-hot-toast";
import { createNote } from "../../utils/noteServices";

const NoteSave = ({ labelId, onNoteAdded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const textAreaRef = useRef();
  function handleInput(e) {
    const textarea = textAreaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  function handleSaveNote() {
    const id = toast.loading("Creating note...");
    if (!title.trim() || !content.trim()) {
      toast.error("Empty note discarded", { id });
      return;
    }

    createNote({ title, content }, labelId)
      .then((res) => {
        // console.log(res);
        toast.success("Note created", { id });
        onNoteAdded(res.data.data);
        setTitle('')
        setContent('')
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.message || "Something went wrong : Note creation failed",
          { id }
        );
      });
  }

  return (
    <div className="w-full rounded-2xl bg-amber-100 shadow-2xl flex flex-col gap-3 py-8 px-2">
      <div className="flex items-center gap-3">
        <input
          value={title}
          type="text"
          name="title"
          className="outline-none text-xl w-full"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button
          className="border-0 hover:bg-amber-300 duration-300"
          onClick={handleSaveNote}
        >
          <FilePlus2 />
        </Button>
      </div>

      <textarea
        ref={textAreaRef}
        value={content}
        name="content"
        placeholder="Take a note.."
        rows={2}
        className="outline-none text-base h-fit overflow-hidden resize-none"
        onInput={handleInput}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
};

export default NoteSave;
