import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";

export const authLayer = (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers["authorization"]?.split(" ")[1];
  
    if (!token) {
      return next(new ApiError(401, "Token missing or unauthorized"));
    }
  
    const userData = jwt.verify(token, process.env.JWT_SECRET);
  
    req.user = userData;
  
    next()
  } catch (error) {
    return next(new ApiError(401 , 'Invalid or expired token'))
  }
};
