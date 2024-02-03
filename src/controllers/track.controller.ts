import { NextFunction, Request, Response } from "express";
import { findAllTracks } from "../services/track.service";

export const getAllTracksHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tracks = await findAllTracks();

    res.status(200).json({
      status: "success",
      result: tracks.length,
      data: {
        tracks,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
