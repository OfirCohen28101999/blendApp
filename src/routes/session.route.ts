import express from "express";
import { googleOauthHandler } from "../controllers/auth.controller";

const router = express.Router();

/**
 * @swagger
 *
 * /api/auth/session/oauth/google:
 *   get:
 *     summary:  gets google user info, used as redirect.
 */
router.get("/oauth/google", googleOauthHandler);

export default router;
