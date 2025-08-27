import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
      default: "",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    label: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Label",
      },
    ],
  },
  { timestamps: true }
);

schema.pre("save", async function (req, res, next) {
  if (!this.isModified("password")) return next;

  const hashedPass = await bcrypt.hash(this.password, 10);
  this.password = hashedPass;
});

schema.methods.comparePassword = async function (enterdPass) {
  return await bcrypt.compare(enterdPass, this.password);
};

export const User = mongoose.model("User", schema);
