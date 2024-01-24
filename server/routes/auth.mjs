import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import "dotenv/config";

const User = mongoose.model("User");
const secret = process.env.JWT_SECRET;

export const signUp = async (request, response) => {
  // Get the details
  const { email, password } = request.body;

  // Check for user existance
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    return response.status(422).json({
      success: false,
      message: "This details are invalid.",
      severity: "warning",
    });
  }

  // Create Hashing of password
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(password, salt);

  // Create user
  const user = new User({
    email,
    password: secPass,
  });

  try {
    // Save user data
    await user.save();

    // Generate JWT token
    const jwt_token = Jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    response.status(201).json({
      authtoken: `Bearer ${jwt_token}`,
      success: true,
      message: "Your data is saved with us successfully..!",
      severity: "success",
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: `Your request could not be processed, please try again.\nGot an error: ${error}`,
      severity: "error",
    });
  }
};

export const signIn = async (request, response) => {
  // Get the details
  const { email, password } = request.body;

  // Check for user existance
  const userExists = await User.findOne({ email: email });
  if (!userExists) {
    return response.status(422).json({
      success: false,
      message: "User does not exist.",
      severity: "warning",
    });
  }
};
