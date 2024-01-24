import Express from "express";
import "dotenv/config";
import { signUp, signIn } from "./auth.mjs";

export const router = Express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
