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
import {
  resizePostImage,
  uploadPostImage,
} from "../upload/single-upload-sharp";
import { validate } from "../middleware/validate";
import {
  createPostSchema,
  deletePostSchema,
  getPostSchema,
  updatePostSchema,
} from "../schemas/post.schema";
import {
  checkCommentOwnership,
  checkPostOwnership,
} from "../middleware/checkOwnership";

const router = express.Router();

router.use(deserializeUser, requireUser);

// todo: swagger
// todo: testing
// GET	/api/post	Retrieve all posts

// todo: swagger
// todo: testing
// POST	/api/post	Creates a new post
router
  .route("/")
  .post(
    uploadPostImage,
    resizePostImage,
    // parsePostFormData,
    validate(createPostSchema),
    createPostHandler
  )
  .get(getAllPostsHandler);

// todo: swagger
// todo: testing
// GET	/api/post/:id	Returns a single post

// todo: swagger
// todo: testing
// PATCH	/api/post/:id	Updates a post

// todo: swagger
// todo: testing
// DELETE	/api/post/:id	Deletes a post
router
  .route("/:postId")
  .get(validate(getPostSchema), getPostByIdHandler)
  .patch(
    checkPostOwnership,
    uploadPostImage,
    resizePostImage,
    // parsePostFormData,
    validate(updatePostSchema),
    updatePostHandler
  )
  .delete(checkPostOwnership, validate(deletePostSchema), deletePostHandler);

// todo: swagger
// todo: testing
router.get("/:postId/comments", getCommentsByPostIdHandler);

// todo: needs to be checked
// todo: swagger
// todo: testing
router.post("/comment/:postId", createCommentHandler);

// todo: needs to be checked
// todo: swagger
// todo: testing
router
  .route("/comment/:commentId")
  .patch(checkCommentOwnership, updateCommentHandler)
  .delete(checkCommentOwnership, deleteCommentHandler);

export default router;
