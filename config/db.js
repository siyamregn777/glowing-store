import mongoose from "mongoose";

const connection = {};

async function connectDb() {
  if (connection.isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "qickcart",
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000
    });
    connection.isConnected = db.connections[0].readyState;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export default connectDb;