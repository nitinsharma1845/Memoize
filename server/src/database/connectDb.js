import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDb connection successfull... ");
  } catch (error) {
    console.log("MongoDb Connection Error :::", error);
  }
};
