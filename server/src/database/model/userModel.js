import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      required: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    label: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lable",
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", schema);
