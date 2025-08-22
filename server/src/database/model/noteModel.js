import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "archived", "trashed"],
      default: "active",
    },

    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Note = mongoose.model("Note", schema);
