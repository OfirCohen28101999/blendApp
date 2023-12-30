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
router.post("/register", validate(createUserSchema), registerHandler);

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

// Refresh access toke route
router.get("/refresh", refreshAccessTokenHandler);

router.use(deserializeUser, requireUser);

// Logout User
router.get("/logout", logoutHandler);

export default router;
