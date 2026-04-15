import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { seedDefaultsIfEmpty } from "./seedDefaults.js";

let memoryServer;

const connectDB = async () => {
  const defaultUri = "mongodb://localhost:27017/caac_admin_db";
  const mongoUri = process.env.MONGO_URI || defaultUri;

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    await seedDefaultsIfEmpty();
  } catch (error) {
    console.error(`Primary MongoDB connection failed: ${error.message}`);

    try {
      memoryServer = await MongoMemoryServer.create();
      const memoryUri = memoryServer.getUri();
      const memoryConn = await mongoose.connect(memoryUri);
      console.log(
        `MongoDB in-memory fallback started: ${memoryConn.connection.host}`
      );
      await seedDefaultsIfEmpty();
      console.log(
        "Data will reset when backend restarts. Set MONGO_URI in backend/.env for persistent data."
      );
    } catch (fallbackError) {
      console.error(`Fallback MongoDB failed: ${fallbackError.message}`);
      process.exit(1);
    }
  }
};

export default connectDB;
