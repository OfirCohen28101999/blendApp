import express from "express";
import {
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

// todo: swagger
router.get("/", restrictTo("admin"), getAllUsersHandler);

// todo: test update user
// todo: swagger, testing
router
  .route("/me")
  .get(getMeHandler)
  .patch(uploadPostImage, resizeUserProfileImage, updateUserHandler);

export default router;
