import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI; // Ensure this environment variable is set

if (!MONGO_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

const connectToDb = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to the database");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

export default connectToDb;
