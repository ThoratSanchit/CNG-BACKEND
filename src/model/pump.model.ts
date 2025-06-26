import mongoose from "mongoose";

const pumpSchema = new mongoose.Schema(
  {
    pump_name: { type: String, required: true },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
        validate: {
          validator: function (val: number[]) {
            return val.length === 2;
          },
          message: "Location must be [lng, lat]",
        },
      },
    },

    ownerID: {
      type: String, // UUID reference
      ref: "UserProfile", // ✅ match model name, not collection name
      required: true,
    },

    address: { type: String },

    cng_status: {
      type: String,
      enum: ["Available", "Not Available", "Unknown"],
      required: true,
    },

    last_updated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

pumpSchema.index({ location: "2dsphere" });

export const PumpModel = mongoose.model("Pump", pumpSchema);
