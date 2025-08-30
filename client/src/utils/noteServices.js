import { api } from "./api";

const createNote = async (data, labelId) => {
  return api.post(`/note/${labelId}/create`, data);
};

const getNoteByStatus = async (status) => {
  return api.get(`/note/notes?status=${status}`);
};

const getPinnedNotes = async () => {
  return api.get("/note/pinned");
};

const togglePin = async (noteId)=>{
  return api.patch(`note/${noteId}/notes`)
}

const changeNoteStatus = async (noteId, labelId, status) => {
  return api.patch(`/note/${labelId}/change-status/${noteId}?status=${status}`);
};

export { createNote, getNoteByStatus, getPinnedNotes, changeNoteStatus, togglePin };
