import { Router } from "express";
import { errorHandler } from "../middleware/error.middleware.js";
import { authLayer } from "../middleware/auth.middleware.js";
import {
  createLabel,
  deleteLabel,
  getAllLabels,
  getLabelNotes,
  updateLabel,
} from "../controller/label.controller.js";

export const labelRoute = Router();

labelRoute.post("/create", authLayer, createLabel, errorHandler);
labelRoute.get("/:labelId", authLayer, getLabelNotes, errorHandler);
labelRoute.get("/", authLayer, getAllLabels, errorHandler);
labelRoute.delete("/delete/:labelId", authLayer, deleteLabel, errorHandler);
labelRoute.post("/update/:labelId", authLayer, updateLabel, errorHandler);
