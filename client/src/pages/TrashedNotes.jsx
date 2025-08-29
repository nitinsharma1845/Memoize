import React, {useState , useEffect} from "react";
import { Trash } from "../components";
import { getNoteByStatus } from "../utils/noteServices";
const TrashedNotes = () => {

  const [TrashedNotes, setTrashedNotes] = useState([]);

  useEffect(() => {
    const fetchArchivedNotes = () => {
      getNoteByStatus("archived")
        .then(({ data }) => {
          // console.log(data);
          setTrashedNotes(data.data);
        })
        .catch((err) => {
          console.log("Trashed Note fetch error", err);
        });
    };

    fetchArchivedNotes();
  }, []);

  return (
     <div>
      {TrashedNotes.length === 0 ? (
        <div className="text-center text-2xl font-semibold opacity-75 p-10">No Notes In Trash</div>
      ) : (
        <div>
          {TrashedNotes?.map((note) => {
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

export default TrashedNotes;
