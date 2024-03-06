import Express from "express";
import "dotenv/config";
import { signUp, signIn, resetPassword, getUser, nodeMailer } from "./auth.mjs";
import { verifyToken } from "../middleware/tokenVerification.mjs";
import { addToFavourite, getFavourite, removeFavourite } from "./list.mjs";

export const router = Express.Router();

router.post("/sendEmail", nodeMailer);
router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/userDetails", verifyToken, getUser);
router.post("/reset", resetPassword);

router.post("/addToFavourite", addToFavourite);
router.get("/getFavourite", verifyToken, getFavourite);
router.post("/removeFavourite", removeFavourite);
