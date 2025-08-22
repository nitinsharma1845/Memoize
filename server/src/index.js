import dotenv from "dotenv";
dotenv.config();
import { app } from "./app.js";
import { connectDb } from "./database/connectDb.js";

connectDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("App Error :::", err);
  });
