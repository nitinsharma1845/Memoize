import { ApiError } from "../utils/apiError.js";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      success: false,
      message: err.message,
      status: err.status,
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message || "Internal server Error",
    status: err.status || 500,
  });
};
