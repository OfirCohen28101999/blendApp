import express from "express";
import {
  getAllUsersHandler,
  getMeHandler,
  updateUserHandler,
} from "../controllers/user.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { restrictTo } from "../middleware/restrictTo";

const router = express.Router();

router.use(deserializeUser, requireUser);

// todo: swagger
router.get("/", restrictTo("admin"), getAllUsersHandler);

// todo: swagger
router.get("/me", getMeHandler);

// todo: needs to be implemented
// todo: swagger
// todo: testing
router.put("/me/update", updateUserHandler);

export default router;
