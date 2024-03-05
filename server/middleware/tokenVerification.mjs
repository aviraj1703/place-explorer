import Jwt from "jsonwebtoken";
import mongoose from "mongoose";
import "dotenv/config";

const User = mongoose.model("User");
const secret = process.env.JWT_SECRET;

export const verifyToken = (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) {
    return response.status(401).json({
      success: false,
      message: "Unauthorized access.",
      severity: "error",
    });
  }

  const bearer_token = authorization.replace("Bearer ", "");

  Jwt.verify(bearer_token, secret, (err, payload) => {
    if (err)
      return response.status(401).json({
        success: false,
        message: "Unauthorized access.",
        severity: "error",
      });
    const { id } = payload;
    User.findById(id).then((userData) => {
      request.user = userData;
      next();
    });
  });
};
