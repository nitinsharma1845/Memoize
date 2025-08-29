import { api } from "./api";

const createNote = async (data, labelId) => {
  return api.post(`/note/${labelId}/create`, data);
};

const getNoteByStatus = async (status) => {
  return api.get(`/note/notes?status=${status}`);
};

export { createNote, getNoteByStatus };
