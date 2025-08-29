import React, { useEffect, useState } from "react";
import { Archive, NoteCard } from "../components";
import { getNoteByStatus } from "../utils/noteServices";

const ArchivedNotes = () => {
  const [archiveNotes, setArchiveNotes] = useState([]);

  useEffect(() => {
    const fetchArchivedNotes = () => {
      getNoteByStatus("archived")
        .then(({ data }) => {
          // console.log(data);
          setArchiveNotes(data.data);
        })
        .catch((err) => {
          console.log("Archived Note fetch error", err);
        });
    };

    fetchArchivedNotes();
  }, []);

  return (
    <div>
      {archiveNotes.length === 0 ? (
        <div className="text-center text-2xl font-semibold opacity-75 p-10">No Notes In Archive</div>
      ) : (
        <div>
          {archiveNotes?.map((note) => {
            <NoteCard
              title={note.title}
              content={note.content}
              key={note._id}
            />;
          })}
        </div>
      )}
    </div>
  );
};

export default ArchivedNotes;
