import express from "express";
import {
  loginHandler,
  logoutHandler,
  refreshAccessTokenHandler,
  registerHandler,
} from "../controllers/auth.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import { createUserSchema, loginUserSchema } from "../schemas/user.schema";
import {
  resizeUserProfileImage,
  uploadPostImage,
} from "../upload/single-upload-sharp";

const router = express.Router();

/**
 * @swagger
 *
 * /api/auth/register:
 *   post:
 *     produces:
 *       - application/json
 *     summary:  register a new user(locally, not through google verification).
 *     parameters:
 *       - name: name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         required: true
 *         type: string
 *       - name: passwordConfirm
 *         in: formData
 *         required: true
 *         type: string
 *       - name: bio
 *         in: formData
 *         required: true
 *         type: string
 */
router.post(
  "/register",
  validate(createUserSchema),
  uploadPostImage,
  resizeUserProfileImage,
  registerHandler
);

/**
 * @swagger
 *
 * /api/auth/login:
 *   post:
 *     produces:
 *       - application/json
 *     summary:  login an existing user.
 *     parameters:
 *       - name: email
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         required: true
 *         type: string
 */
router.post("/login", validate(loginUserSchema), loginHandler);

/**
 * @swagger
 *
 * /api/auth/refresh:
 *   get:
 *     summary:  refreshes the access_token when getting refresh_token from cookies.
 *     produces:
 *       - application/json
 */
router.get("/refresh", refreshAccessTokenHandler);

router.use(deserializeUser, requireUser);

/**
 * @swagger
 *
 * /api/auth/logout:
 *   get:
 *     summary:  logs out the user by access_token given in cookies[ends all sessions].
 *     produces:
 *       - application/json
 */
router.get("/logout", logoutHandler);

export default router;
