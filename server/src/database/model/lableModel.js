import mongoose, { Schema } from "mongoose";

const labelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
      },
    ],

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Label = mongoose.model("Label", labelSchema);
