import Jwt from "jsonwebtoken";
import mongoose from "mongoose";
import "dotenv/config";

const User = mongoose.model("User");
const secret = process.env.JWT_SECRET;

export const verfyToken = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).send("Unauthorized access.");
  }

  const bearer_token = authorization.replace("Bearer ", "");

  Jwt.verify(bearer_token, secret, (err, payload) => {
    if (err) return response.status(401).send("Unauthorized access.");
    const { id } = payload;
    User.findById(id).then((userData) => {
      request.user = userData;
      next();
    });
  });
};