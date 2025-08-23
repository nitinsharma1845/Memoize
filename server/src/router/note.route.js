import { Router } from "express";
import { errorHandler } from "../middleware/error.middleware.js";
import { authLayer } from "../middleware/auth.middleware.js";
import { changeNoteStatus, createNote, getNoteByStatus, toggleNotePin, updateNote } from "../controller/note.controller.js";

export const noteRouter = Router();

noteRouter.post("/:labelId/create", authLayer, createNote, errorHandler);
noteRouter.post(
  "/:labelId/update/:noteId",
  authLayer,
  updateNote,
  errorHandler
);

noteRouter.patch(
  "/:labelId/change-status/:noteId",
  authLayer,
  changeNoteStatus,
  errorHandler
);

noteRouter.get(
  "/:labelId/notes",
  authLayer,
  getNoteByStatus,
  errorHandler
);


noteRouter.patch(
  "/:noteId/notes",
  authLayer,
  toggleNotePin,
  errorHandler
);
