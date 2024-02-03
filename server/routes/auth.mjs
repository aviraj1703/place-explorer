import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import "dotenv/config";

const User = mongoose.model("User");
const secret = process.env.JWT_SECRET;

export const signUp = async (request, response) => {
  // Get the details
  const { name, email, password } = request.body;

  // Check for user existance
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    console.log("User exists");
    return response.status(422).json({
      success: false,
      message: "User already exists.",
      severity: "warning",
    });
  }

  // Create Hashing of password
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(password, salt);

  // Create user
  const user = new User({
    name,
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

    console.log("Successfully registered..!");
    return response.status(201).json({
      authToken: `Bearer ${jwt_token}`,
      success: true,
      message: "Your data is saved with us successfully..!",
      severity: "success",
    });
  } catch (error) {
    console.log("Error aa gai bhaiya..!");
    return response.status(500).json({
      success: false,
      message: `${error}`,
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

  // Compare hashed password
  try {
    bcrypt.compare(password, userExists.password, (err, result) => {
      if (!result || err)
        return response.status(422).json({
          success: false,
          message: "Invalid credentials.",
          severity: "warning",
        });

      // Generate JWT token
      const jwt_token = Jwt.sign(
        {
          id: userExists._id,
        },
        secret
      );

      return response.status(200).json({
        authToken: `Bearer ${jwt_token}`,
        success: true,
        message: "You're logged in successfully..!",
        severity: "success",
      });
    });
  } catch (error) {
    return response.status(422).json({
      success: false,
      message: error,
      severity: "warning",
    });
  }
};

export const verifyUser = async (request, response) => {
  // Get the details
  const { email } = request.body;

  // Check for user existance
  const userExists = await User.findOne({ email: email });
  if (!userExists) {
    return response.status(422).json({
      success: false,
      message: "User does not exist.",
      severity: "warning",
    });
  }
  return response.status(200).json({
    success: true,
    message: "User exists.",
    severity: "success",
  });
};

export const resetPassword = async (request, response) => {
  // Get the details
  const { email, password } = request.body;

  // Check for user existance
  const userExists = await User.findOne({ email: email });
  // if (!userExists) {
  //   return response.status(422).json({
  //     success: false,
  //     message: "User does not exist.",
  //     severity: "warning",
  //   });
  // }
};
