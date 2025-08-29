import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLabelNotes } from "../utils/labelsServices";
import { Loading, NoteSave, NoteCard } from "../components";

const Notes = () => {
  const [loading, setLoading] = useState(true);
  const { labelId } = useParams();
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
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
            <NoteCard
              key={note._id}
              title={note.title}
              content={note.content}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;
