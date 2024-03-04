import express from "express";
import {
  deleteImageHandler,
  getAllUsersHandler,
  getMeHandler,
  updateUserHandler,
} from "../controllers/user.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { restrictTo } from "../middleware/restrictTo";
import {
  uploadPostImage,
  resizeUserProfileImage,
} from "../upload/single-upload-sharp";

const router = express.Router();

router.use(deserializeUser, requireUser);

/**
 * @swagger
 *
 * /api/users:
 *   get:
 *     produces:
 *       - application/json
 *     summary:  gets all users. [this can only be done by admin role users]
 */
router.get("/", restrictTo("admin"), getAllUsersHandler);

// todo: testing
/**
 * @swagger
 *
 * /api/users:
 *   get:
 *     produces:
 *       - application/json
 *     summary:  get current user (by access token provided through cookies/Authorization starting with Bearer in headers)
 */
router
  .route("/me")
  .get(getMeHandler)
  .patch(uploadPostImage, resizeUserProfileImage, updateUserHandler);

router
  .route("/image/delete/:imageName")
  .delete(deleteImageHandler)
  
export default router;
