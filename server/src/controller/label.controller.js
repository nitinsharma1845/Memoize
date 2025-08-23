import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Label } from "../database/model/lableModel.js";

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

  return res
    .status(201)
    .json(new ApiResponse(201, label, "Label created successfull.."));
});

export { createLabel };
