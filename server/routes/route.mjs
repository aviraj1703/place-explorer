import Express from "express";
import "dotenv/config";
import { signUp, signIn, resetPassword, verifyUser } from "./auth.mjs";

export const router = Express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/verify", verifyUser);
router.post("/reset", resetPassword);
