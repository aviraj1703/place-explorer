import Express from "express";
import "dotenv/config";
import { signUp, signIn, resetPassword, getUser, nodeMailer } from "./auth.mjs";
import { verifyToken } from "../middleware/tokenVerification.mjs";
import { addToFavourite, getFavourite, removeFavourite } from "./list.mjs";
import { deleteImage, fetchImage, uploadImage } from "./profile.mjs";

export const router = Express.Router();

// auth.mjs
router.post("/sendEmail", nodeMailer);
router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/userDetails", verifyToken, getUser);
router.post("/reset", resetPassword);

// list.mjs
router.post("/addToFavourite", addToFavourite);
router.get("/getFavourite", verifyToken, getFavourite);
router.delete("/removeFromFavourite/:placeId/:userId", removeFavourite);

// profile.mjs
router.post("/image/upload", uploadImage);
router.get("/image/:filename", fetchImage);
router.delete("/image/:filename", deleteImage);
