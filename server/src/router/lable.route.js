import { Router } from "express";
import { errorHandler } from "../middleware/error.middleware.js";
import { authLayer } from "../middleware/auth.middleware.js";
import { createLabel } from "../controller/label.controller.js";

export const labelRoute = Router();

labelRoute.post("/create", authLayer, createLabel, errorHandler);
