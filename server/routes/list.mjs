import { mongoose } from "mongoose";
import "dotenv/config";

const User = mongoose.model("User");

// Add place to favourite list
export const addToFavourite = async (request, response) => {
  // Get details
  const { _id, placeList } = request.body;

  // Find the user
  const user = await User.findOne({ _id });

  // Get favourite list array and apply logic here
  const list = await user.favoriteList;
  let alreadyExist = false;
  list.map((element) => {
    // Check if list already exist
    if (
      element.name === placeList.name &&
      element.vicinity === placeList.vicinity
    ) {
      alreadyExist = true;
      return;
    }
  });

  // If place is already there
  if (alreadyExist)
    return response.status(201).json({
      success: true,
      message: "Already added to the favourite list.",
      severity: "success",
    });

  // Add place to the list
  list.push(placeList);
  user.favoriteList = list;
  try {
    // Save user data
    await user.save();

    return response.status(201).json({
      success: true,
      message: "Place is added to the favourite list successfully..!",
      severity: "success",
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: `${error}`,
      severity: "error",
    });
  }
};

// Get place from favourite list
export const getFavourite = async (request, response) => {
  // Get the object id from jwt verification
  const _id = request.user._id;

  // Send user info in response
  try {
    const user = await User.findOne({ _id });
    return response.status(200).json({
      success: true,
      favoriteList: user.favoriteList,
      severity: "success",
    });
  } catch (error) {
    return response.status(500).json({ success: false, message: error });
  }
};

// Remove place from favourite list
export const removeFavourite = async (request, response) => {
  // Get the index value and user id
  const { place_id, _id } = request.body;

  // Get the user
  const user = await User.findOne({ _id });

  // Remove particular index value
  const favList = user.favoriteList;
  let idx = -1;
  favList.map((element, index) => {
    if (element._id.toString() === place_id) {
      idx = index;
      return;
    }
  });
  if (idx >= 0 && idx < favList.length) {
    favList.splice(idx, 1);
  } else
    return response.status(500).json({
      success: false,
      message: "Place is not found.",
      severity: "error",
    });

  user.favoriteList = favList;

  try {
    // Save user data
    await user.save();

    return response.status(201).json({
      success: true,
      message: "Place is removed from favourite successfully..!",
      severity: "success",
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: `${error}`,
      severity: "error",
    });
  }
};
