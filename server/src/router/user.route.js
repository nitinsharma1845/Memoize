import { Router } from "express";
import { errorHandler } from "../middleware/error.middleware.js";
import {
  currentUser,
  loginUser,
  logoutUser,
  registerUser,
  uploadAvatar,
} from "../controller/user.controller.js";
import { authLayer } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

export const userRoutes = Router();

userRoutes.post("/signup", registerUser, errorHandler);
userRoutes.post("/login", loginUser, errorHandler);
userRoutes.get("/me", authLayer, currentUser, errorHandler);
userRoutes.delete("/logout", authLayer, logoutUser, errorHandler);
userRoutes.put(
  "/upload-avatar",
  authLayer,
  upload.single("avatar"),
  uploadAvatar,
  errorHandler
);
