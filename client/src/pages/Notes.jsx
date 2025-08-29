import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getLabelNotes } from "../utils/labelsServices";
import { Loading, NoteSave, NoteCard, Button } from "../components";
import { X, Trash2, Archive, Pin } from "lucide-react";

const Notes = () => {
  const [loading, setLoading] = useState(true);
  const { labelId } = useParams();
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [notePreview, setNotePreview] = useState(false);
  const [note, setNote] = useState();
  // console.log(labelId)

  useEffect(() => {
    if (!labelId) return; // no label id means no fetch

    setLoading(true);
    getLabelNotes(labelId)
      .then((res) => {
        if (res?.data?.data) {
          setNotes(res.data.data);
          setError(null);
        } else {
          setError(res.message || "No notes found");
        }
      })
      .catch((err) => {
        console.error("Note fetch error", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [labelId]);

  // console.log(notes);

  useEffect(() => {
    if (notePreview) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [notePreview]);

  function notePreviewfunc(note) {
    setNotePreview(true);
    setNote(note);
  }

  // console.log(note);
  if (loading) return <Loading />;

  return (
    <div>
      <div className="md:w-2xl mx-auto mb-15">
        <NoteSave
          labelId={labelId}
          onNoteAdded={(newNote) => setNotes((prev) => [newNote, ...prev])}
        />
      </div>
      {error ? (
        <div className="grid place-items-center text-2xl opacity-80">
          No notes found
        </div>
      ) : (
        <div className="grid md:grid-cols-3 space-y-10 mt-19">
          {notes?.map((note) => (
            <Link onClick={() => notePreviewfunc(note)} key={note._id}>
              <NoteCard title={note.title} content={note.content} />
            </Link>
          ))}
        </div>
      )}

      {notePreview && note && (
        <div className="fixed z-10 top-20 left-[50%] ml-28 translate-x-[-50%] w-[40%] h-[80%] bg-amber-50 rounded-4xl shadow-2xl p-10 flex flex-col gap-3 overflow-hidden">
          <div className=" absolute top-0 left-0 w-full h-10 bg-amber-300 shadow-xl"></div>

          <div className="overflow-y-auto flex flex-col gap-10">
            <h1 className="text-3xl mt-5 font-bold">{note.title}</h1>

            <p className="text-sm font-semibold text-gray-500 mb-5">
              {note.content}
            </p>
          </div>

          <div className="absolute bottom-0 left-0 w-full bg-amber-100 shadow-3xl flex items-center gap-10 px-5 py-1">
            <Trash2 size={18} />
            <Archive size={18} />
            <Pin size={18} />
            <Button
              onClick={() => setNotePreview(false)}
              size={18}
              className="flex text-sm items-center border-0 shadow-none gap-2 ml-auto"
            >
              Close
              <X />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
