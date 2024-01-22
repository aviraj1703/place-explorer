import Express from "express";
import mongoose from "mongoose";
import JWT from "jsonwebtoken";
import "dotenv/config";

const router = Express.Router();
const user = mongoose.model("User");

router.post("/signup", (req, res) => {
  const { email, password } = req.body;
  
});

export { router };
