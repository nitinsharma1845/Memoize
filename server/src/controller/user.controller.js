import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../database/model/userModel.js";
import { Label } from "../database/model/lableModel.js";
import jwt from "jsonwebtoken";
import { uploadToClodinary } from "../utils/uploadToCloudinary.js";

const registerUser = asyncHandler(async (req, res, next) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password)
    return next(new ApiError(400, "All Fields are required"));

  const existedUser = await User.findOne({ email });

  if (existedUser) return next(new ApiError(409, "User Already Exists..."));

  const user = await User.create({
    username,
    email,
    password,
  });

  if (!user) return next(new ApiError(500, "Error while registering.."));

  const label = await Label.create({
    name: "General",
    notes: [],
    owner: user._id,
  });

  if (!label) return next(new ApiError(500, "Error while creating label"));

  user.label.push(label._id);
  await user.save({ validateBeforeSave: false });

  return res
    .status(201)
    .json(new ApiResponse(201, user, "Registration successful"));
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ApiError(400, "All Fields are required..."));

  const isUserExist = await User.findOne({ email });
  if (!isUserExist) return next(new ApiError(401, "User not registred"));

  const isPasswordCorrect = await isUserExist.comparePassword(password);

  if (!isPasswordCorrect)
    return next(new ApiError(401, "Invalid email or password"));

  const token = jwt.sign(
    {
      username: isUserExist.username,
      email: isUserExist.email,
      _id: isUserExist._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "5d",
    }
  );

  return res
    .status(200)
    .cookie("token", token, { httpOnly: true, secure: false })
    .json(
      new ApiResponse(
        200,
        {
          user: {
            email: isUserExist.email,
            _id: isUserExist._id,
            username: isUserExist.username,
          },
          token: token,
        },
        "Login successfull..."
      )
    );
});

const currentUser = asyncHandler(async (req, res, next) => {
  const user = req.user;

  if (!user) return next(new ApiError(401, "Unauthorized Request"));
  return res.status(200).json(new ApiResponse(200, user, "User fetched.."));
});

const logoutUser = asyncHandler(async (req, res, next) => {
  const user = req.user;

  if (!user) return next(new ApiError(401, "Unauthorized Request"));

  res.clearCookie("token", { httpOnly: true, secure: false });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Logout successfull..."));
});

const uploadAvatar = asyncHandler(async (req, res, next) => {
  const avatarFile = req?.file;

  if (!avatarFile) return next(new ApiError(400, "Avatar is required..."));

  const avatarUrl = await uploadToClodinary(avatarFile.path);

  if (!avatarUrl) return next(new ApiError(500, "Error while uploading image"));

  // console.log("Avatar url :::", avatarUrl);

  const user = await User.findByIdAndUpdate(
    { _id: req?.user._id },
    { avatar: avatarUrl },
    { new: true }
  ).select("-password");

  return res.status(200).json(new ApiResponse(200, user, "Avatar updated.."));
});

export { registerUser, loginUser, currentUser, logoutUser, uploadAvatar };
