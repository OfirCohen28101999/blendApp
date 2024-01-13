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

// todo: swagger
router.get("/refresh", refreshAccessTokenHandler);

router.use(deserializeUser, requireUser);

// todo: swagger
router.get("/logout", logoutHandler);

export default router;
