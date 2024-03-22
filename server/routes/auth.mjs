import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import "dotenv/config";
import { sendEmail } from "../services/nodemailer.mjs";

const User = mongoose.model("User");
const secret = process.env.JWT_SECRET;

// Send verification code via nodemailer
export const nodeMailer = async (request, response) => {
  // Get the details
  const { email, isVarified } = request.body;

  // Check for user existance
  const userExists = await User.findOne({ email: email });
  if (userExists && !isVarified)
    return response.status(422).json({
      success: false,
      message: "User already exists.",
      severity: "warning",
    });
  else if (!userExists && isVarified)
    return response.status(404).json({
      success: false,
      message: "User does not exists.",
      severity: "warning",
    });

  // Send verification code
  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  const message = {
    subject: "Place Explorer account verification",
    text: `<p>6 digit verification code: <b>${verificationCode}</b></p>`,
  };
  const isEmailSent = await sendEmail(email, message);

  if (isEmailSent)
    return response.status(200).json({
      success: true,
      pin: verificationCode,
      isItSingUp: !isVarified,
      message: "6 digit verification code has been sent to your email.",
      severity: "success",
    });

  return response.status(500).json({
    success: false,
    message: "Internal server error.",
    severity: "warning",
  });
};

// Register user
export const signUp = async (request, response) => {
  // Get the details
  const { name, email, password } = request.body;

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
    console.log("Registered.");
    return response.status(201).json({
      authToken: `Bearer ${jwt_token}`,
      success: true,
      message: "Your data is saved with us successfully..!",
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

// Login user
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
        return response.status(401).send({
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
      console.log("Signed in.");
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

// Check user verification status
export const getUser = async (request, response) => {
  // Get the object id from jwt verification
  const _id = request.user._id;

  // Send user info in response
  try {
    const user = await User.findOne({ _id });
    console.log("Details sent.");
    return response.status(200).json({
      success: true,
      id: _id,
      name: user.name,
      email: user.email,
      severity: "success",
    });
  } catch (error) {
    return response.status(500).json({ success: false, message: error });
  }
};

// Reset Password
export const resetPassword = async (request, response) => {
  // Get the details
  const { email, password } = request.body;

  // Get the existing user
  const userExists = await User.findOne({ email: email });

  // Create Hashing of password
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(password, salt);

  // Change password value
  userExists.password = secPass;

  try {
    // Save user
    await userExists.save();

    // Send confirmation mail
    const message = {
      subject: "Place Explorer password change",
      text: `<p>Your password has been changed successfully.</p>`,
    };
    await sendEmail(email, message);
    console.log("Password is reset.");
    return response.status(201).json({
      success: true,
      message: "Please login with your new password.",
      severity: "success",
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Internal server error.",
      severity: "warning",
    });
  }
};
