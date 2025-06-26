import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userProfileSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    userID: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: false,
    },
    location: {
      type: [Number], // [longitude, latitude]
      required: false,
      validate: {
        validator: function (val: number[]) {
          return val.length === 2;
        },
        message: "Location must be an array of two numbers [longitude, latitude]",
      },
    },
  },
  { timestamps: true }
);

export const UserProfileModel = mongoose.model("UserProfile", userProfileSchema);
