import express from "express";
import { googleOauthHandler } from "../controllers/auth.controller";

const router = express.Router();

// todo: swagger
router.get("/oauth/google", googleOauthHandler);

export default router;
