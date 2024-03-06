import express from "express";
import { getAllTracksHandler } from "../controllers/track.controller";

const router = express.Router();

// GET	/api/tracks	gets all tracks
/**
 * @swagger
 *
 * /api/tracks:
 *   get:
 *     produces:
 *       - application/json
 *     summary:  gets all tracks.
 */
router.route("/").get(getAllTracksHandler);

export default router;
