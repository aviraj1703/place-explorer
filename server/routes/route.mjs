import Express from "express";
import "dotenv/config";
import { signUp, signIn, resetPassword, getUser, nodeMailer } from "./auth.mjs";
import { verfyToken } from "../middleware/tokenVerification.mjs";

export const router = Express.Router();

router.post("/sendEmail", nodeMailer);
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/verify", verfyToken, getUser);
router.post("/reset", resetPassword);
