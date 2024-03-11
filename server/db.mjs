import mongoose from "mongoose";
import "dotenv/config";

// Establish MongoDB connection
const connectionPromise = mongoose.connect(process.env.MONGO_URL);

// Handle connection status
connectionPromise
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((error) => {
    console.error(`Failed to connect to MongoDB due to:\n${error}`);
  });

export default connectionPromise;
