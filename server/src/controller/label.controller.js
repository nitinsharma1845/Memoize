import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Label } from "../database/model/lableModel.js";
import { User } from "../database/model/userModel.js";

const createLabel = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const user = req.user;

  if (!name) return next(new ApiError(400, "Name is required"));

  const existingLabel = await Label.findOne({ name, owner: user._id });

  if (existingLabel) {
    return next(new ApiError(400, "Label with this name already exists"));
  }

  const label = await Label.create({
    name,
    owner: user._id,
  });

  if (!label) return next(new ApiError(500, "Error while creating label..."));

  const owner = await User.findById(user._id);

  owner.label.push(label._id);
  await owner.save({ validateBeforeSave: false });

  return res
    .status(201)
    .json(new ApiResponse(201, label, "Label created successfull.."));
});

const updateLabel = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const { labelId } = req.params;

  if (!name) return next(new ApiError(400, "Name is required"));

  const label = await Label.findOneAndUpdate(
    { owner: req.user._id, _id: labelId },
    { name },
    { new: true }
  );

  if (!label)
    return next(new ApiError(400, "Error while updating name of label"));

  return res
    .status(200)
    .json(new ApiResponse(200, label, "Label Name updated"));
});

const deleteLabel = asyncHandler(async (req, res, next) => {
  const { labelId } = req.params;

  const label = await Label.deleteOne({ _id: labelId, owner: req.user?._id });

  if (label.deletedCount === 0) {
    return next(new ApiError(404, "Label not found or unauthorized"));
  }

  return res.status(200).json(new ApiResponse(200, null, "Label deleted"));
});

const getLabelNotes = asyncHandler(async (req, res, next) => {
  const { labelId } = req.params;

  if (!labelId) return next(new ApiError(400, "lable id is required"));

  const label = await Label.findOne({
    _id: labelId,
    owner: req.user._id,
  }).populate("notes");
  // console.log("Notes in label ::" , label)

  if (!label || !label.notes || label.notes.length === 0)
    return next(new ApiError(400, "No notes found"));

  return res
    .status(200)
    .json(new ApiResponse(200, label.notes, "Note fetched successfully"));
});

const getAllLabels = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("label");
  // console.log(req.user._id);

  if (!user) return next(new ApiError(400, "User not found"));
  // console.log(user);
  return res
    .status(200)
    .json(
      new ApiResponse(200, { labels: user.label }, "Labels fetch successfully ")
    );
});

export { createLabel, updateLabel, deleteLabel, getLabelNotes, getAllLabels };
