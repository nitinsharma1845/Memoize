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
