import mongoose from "mongoose";

const favoritePlaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  vicinity: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: undefined,
  },
  user_ratings_total: {
    type: Number,
    default: undefined,
  },
  image: {
    type: String, // Assuming you store the image URL as a string
    default: undefined,
  },
});

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favoriteList: [{
    type: favoritePlaceSchema,
  }],
});

mongoose.model("User", userSchema);
