import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log("MONGODB_URI not found", "CWD:", process.cwd());
    throw new Error("MONGODB_URI not found");
  }
  if (isConnected) return;

  await import("./models/thread.models");
  await import("./models/user.model");

  await mongoose.connect(uri, { dbName: "hehe" });
  isConnected = true;
  console.log("Connected to MongoDB");
};
