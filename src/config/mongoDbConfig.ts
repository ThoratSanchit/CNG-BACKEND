// plugins/mongodbConfig.ts
import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not defined");
  }
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected successfully");
    return { connected: true, message: "MongoDB connected successfully" };
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    return { connected: false, message: "MongoDB connection failed", error: err };
  }
};

