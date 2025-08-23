import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Note } from "../database/model/noteModel.js";
import { Label } from "../database/model/lableModel.js";
import mongoose from "mongoose";

const createNote = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;
  const { labelId } = req.params;

  if (!title || !content)
    return next(new ApiError(400, "All Feilds are required"));

  if (!mongoose.Types.ObjectId.isValid(labelId))
    return next(new ApiError(400, "Inavlid label id"));

  const note = await Note.create({
    title,
    content,
    owner: req.user._id,
    label: labelId,
  });

  if (!note) return next(new ApiError(500, "Error while creating the note"));

  return res.status(201).json(new ApiResponse(201, note, "Note created.."));
});

const updateNote = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;
  const { labelId, noteId } = req.params;

  if (!title || !content)
    return next(new ApiError(400, "All feilds are required"));
  if (
    !mongoose.Types.ObjectId.isValid(labelId) ||
    !mongoose.Types.ObjectId.isValid(noteId)
  )
    return next(new ApiError(400, "Invalid label id or note id"));

  const note = await Note.findOneAndUpdate(
    { _id: noteId, label: labelId },
    { title, content },
    { new: true }
  );

  if (!note) return next(new ApiError(500, "Error while updating note"));

  return res.status(200).json(new ApiResponse(200, note, "Note updated"));
});

const changeNoteStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.query;
  const { noteId, labelId } = req.params;

  const noteStatus = ["active", "archived", "trashed"];

  if (!noteStatus.includes(status))
    return next(new ApiError(400, "Invalid status"));

  if (
    !mongoose.Types.ObjectId.isValid(noteId) ||
    !mongoose.Types.ObjectId.isValid(labelId)
  ) {
    return next(new ApiError(404, "Invalid note or label ID"));
  }

  const note = await Note.findOneAndUpdate(
    { label: labelId, _id: noteId },
    { status },
    { new: true }
  );

  if (!note) return next(new ApiError(404, "No such note found in lable"));

  return res
    .status(200)
    .json(new ApiResponse(200, note, `Note status changed to ${status}`));
});

const getNoteByStatus = asyncHandler(async (req, res, next) => {
  const { labelId } = req.params;
  const { status } = req.query;

  const noteStatus = ["active", "archived", "trashed"];

  if (!noteStatus.includes(status))
    return next(new ApiError(400, "Invalid status"));

  if (!mongoose.Types.ObjectId.isValid(labelId)) {
    return next(new ApiError(404, "Invalid Note ID"));
  }

  const notes = await Note.find({ label: labelId, status });

  if (!notes) return next(new ApiError(400, "No notes found"));

  return res.status(200).json(new ApiResponse(200, notes, "Notes fetched .."));
});

const deleteNote = asyncHandler(async (req, res, next) => {
  const { labelId, noteId } = req.params;

  if (
    !mongoose.Types.ObjectId.isValid(noteId) ||
    !mongoose.Types.ObjectId.isValid(labelId)
  ) {
    return next(new ApiError(404, "Invalid note or label ID"));
  }

  const note = await Note.deleteOne({
    label: labelId,
    _id: noteId,
    owner: req.user._id,
  });

  if (note.deletedCount === 0)
    return next(new ApiError(400, "No note found to be deleted"));

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Note deleted permanently"));
});

const toggleNotePin = asyncHandler(async (req, res, next) => {
  const { noteId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    return next(new ApiError(404, "Invalid note or label ID"));
  }

  const note = await Note.findById(noteId);

  if (!note) return next(new ApiError(404, "No such note found"));

  note.isPinned = !note.isPinned;
  await note.save({ validateBeforeSave: true });

  return res
    .status(200)
    .json(new ApiResponse(200, note, "Note pinned status changed"));
});

export {
  createNote,
  updateNote,
  changeNoteStatus,
  getNoteByStatus,
  deleteNote,
  toggleNotePin
};
