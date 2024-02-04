import Express from "express";
import "dotenv/config";
import { signUp, signIn, resetPassword, verifyUser, nodeMailer } from "./auth.mjs";

export const router = Express.Router();

router.post("/sendEmail", nodeMailer);
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/verify", verifyUser);
router.post("/reset", resetPassword);
