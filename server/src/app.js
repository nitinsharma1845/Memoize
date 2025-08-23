import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

//api routes

import { userRoutes } from "./router/user.route.js";
import { noteRouter } from "./router/note.route.js";
import { lableRoute } from "./router/lable.route.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/note", noteRouter);
app.use("/api/v1/lable", lableRoute);
