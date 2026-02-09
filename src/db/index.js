import mongoose from "mongoose";
import { DB_NAME } from "../constant.js"; // go up one folder


const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`, );
    console.log(`✅ Database connected successfully. Host: ${connectionInstance.connection.host}`);
    // Print connection state: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    console.log("MongoDB connection state:", mongoose.connection.readyState);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;