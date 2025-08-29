import { api } from "./api";

const createNote = async (data, labelId) => {
  return api.post(`/note/${labelId}/create` , data);
};

export { createNote };
