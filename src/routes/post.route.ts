import express from "express";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import {
  createCommentHandler,
  createPostHandler,
  deleteCommentHandler,
  deletePostHandler,
  getAllPostsHandler,
  getCommentsByPostIdHandler,
  getPostByIdHandler,
  updateCommentHandler,
  updatePostHandler,
} from "../controllers/post.controller";

const router = express.Router();

router.use(deserializeUser, requireUser);

// todo: needs to be checked
// todo: swagger
// todo: testing
router.post("/", getAllPostsHandler);

// todo: needs to be checked
// todo: swagger
// todo: testing
router.post("/create", createPostHandler);

// todo: needs to be implemented
// todo: swagger
// todo: testing
router.put("/update/:postId", updatePostHandler);

// todo: needs to be implemented
// todo: swagger
// todo: testing
router.delete("/delete/:postId", deletePostHandler);

// todo: needs to be implemented
// todo: swagger
// todo: testing
router.get("/:postId", getPostByIdHandler);

// todo: needs to be implemented
// todo: swagger
// todo: testing
router.get("/:postId/comments", getCommentsByPostIdHandler);

// todo: needs to be implemented
// todo: swagger
// todo: testing
router.post("/comment/create/:postId", createCommentHandler);

// todo: needs to be implemented
// todo: swagger
// todo: testing
router.put("/comment/update/:commentId", updateCommentHandler);

// todo: needs to be implemented
// todo: swagger
// todo: testing
router.delete("/comment/delete/:commentId", deleteCommentHandler);

export default router;
