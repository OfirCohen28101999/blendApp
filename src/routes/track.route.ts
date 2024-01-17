import express from "express";
import { getAllTracksHandler } from "../controllers/track.controller";

const router = express.Router();

// todo: swagger
// todo: testing
// POST	/api/tracks	gets all tracks
router.route("/").get(getAllTracksHandler);

export default router;
