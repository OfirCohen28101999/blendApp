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

// todo: testing
// GET	/api/post	Retrieve all posts
// POST	/api/post	Creates a new post
/**
 * @swagger
 *
 * /api/post:
 *   post:
 *     summary:  create a post.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         in: formData
 *         required: true
 *         type: string
 *       - name: trackId
 *         in: formData
 *         required: true
 *         type: string
 *       - name: image
 *         in: formData
 *         required: false
 *         type: string
 */

/**
 * @swagger
 *
 * /api/post:
 *   get:
 *     produces:
 *       - application/json
 *     summary:  gets all posts.
 */
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

// todo: testing
// GET	/api/post/:id	Returns a single post

// todo: testing
// PATCH	/api/post/:id	Updates a post

// todo: testing
// DELETE	/api/post/:id	Deletes a post
/**
 * @swagger
 *
 * /api/post/:postId:
 *   get:
 *     summary:  returns post by id.
 *     produces:
 *       - application/json
 */
/**
 * @swagger
 *
 * /api/post/:postId:
 *   delete:
 *     summary:  deletes post by id.
 *     produces:
 *       - application/json
 */
/**
 * @swagger
 *
 * /api/post/:postId:
 *   patch:
 *     summary:  updates post by id.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         in: formData
 *         required: true
 *         type: string
 *       - name: trackId
 *         in: formData
 *         required: true
 *         type: string
 *       - name: image
 *         in: formData
 *         required: false
 *         type: string
 */
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

// todo: testing
/**
 * @swagger
 *
 * /api/post/:id/comments:
 *   get:
 *     summary:  get commments of provided post by postId.
 *     produces:
 *       - application/json
 */
router.get("/:postId/comments", getCommentsByPostIdHandler);

// todo: testing
/**
 * @swagger
 *
 * /api/post/comment/:postId:
 *   post:
 *     summary:  create comment on a provided post by postId.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         in: formData
 *         required: true
 *         type: string
 */
router.post("/comment/:postId", createCommentHandler);

// todo: testing
/**
 * @swagger
 *
 * /api/post/comment/:commentId:
 *   patch:
 *     summary:  update comment on a provided post by commentId.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         in: formData
 *         required: true
 *         type: string
 */
/**
 * @swagger
 *
 * /api/post/comment/:commentId:
 *   delete:
 *     summary:  deletes comment by provided commentId.
 *     produces:
 *       - application/json
 */
router
  .route("/comment/:commentId")
  .patch(checkCommentOwnership, updateCommentHandler)
  .delete(checkCommentOwnership, deleteCommentHandler);

export default router;
