import mongoose from "mongoose";
import multer from "multer";

const User = mongoose.model("User");

// multer upload
const upload = multer().single("image");

// Upload an image
export const uploadImage = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log("Error uploading file:", err);
      return res.status(500).json({
        success: false,
        message: "Error uploading file",
        severity: "error",
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      // Extract user ID from body
      const userIdObject = new mongoose.Types.ObjectId(req.body.userId);

      // Create a new image document
      const newImage = {
        name: req.file.originalname,
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };

      // Find the user by ID
      const user = await User.findById({ _id: userIdObject });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Save the image document to the user's profile
      user.profile = newImage;
      await user.save();

      return res.status(200).json({
        success: true,
        message: "File uploaded successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error handling file upload:", error);
      return res.status(500).json({
        success: false,
        message: "Error handling file upload",
        severity: "error",
      });
    }
  });
};

// Fetch an image
export const fetchImage = async (req, res) => {
  try {
    const { filename } = req.params;

    // Extract user ID from the imagename
    const userIdObject = new mongoose.Types.ObjectId(filename);

    const user = await User.findOne({ _id: userIdObject });
    if (!user || !user.profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found.",
        severity: "warning",
      });
    }
    // res.set("Content-Type", user.profile.contentType);
    // res.send(user.profile.data);
    const base64ImageData = user.profile.data.toString('base64');
    return res.status(200).json({
      imageData: base64ImageData,
      contentType: user.profile.contentType
    })
  } catch (error) {
    console.error("Error fetching file from db:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching file",
      severity: "error",
    });
  }
};

// Delete an image
export const deleteImage = async (req, res) => {
  try {
    const { filename } = req.params;

    // Extract user ID from the imagename
    const userIdObject = new mongoose.Types.ObjectId(filename);

    const user = await User.findOne({ _id: userIdObject });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
        severity: "warning",
      });
    }

    user.profile = null;

    await user.save();

    return res.status(201).json({
      success: true,
      message: "Image removed successfully.",
      severity: "success",
    });
  } catch (error) {
    console.error("Error fetching file from db:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching file",
      severity: "error",
    });
  }
};
