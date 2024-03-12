import mongoose from "mongoose";
import "dotenv/config";

// Establish MongoDB connection
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to MongoDB.");
})
.catch((error) => {
  console.error(`Failed to connect to MongoDB due to:\n${error}`);
});
