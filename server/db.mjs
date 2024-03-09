import mongoose from "mongoose";
import "dotenv/config";

export const connection = mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((error) =>
    console.log(`Failed to connect to MongoDB due to \n${error}`)
  );
