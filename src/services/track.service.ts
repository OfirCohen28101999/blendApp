import TrackModel, { Track } from "../models/track.model";
import { FilterQuery, QueryOptions } from "mongoose";
import trackModel from "../models/track.model";

export const createTrack = async (input: Track) => {
  const track = await trackModel.findOneAndUpdate(
    { spotifyId: input.spotifyId },
    input,
    {
      upsert: true,
    }
  );
  return track?.toJSON();
};

export const findTrackBySpotifyId = async (spotifyId: string) => {
  const track = await TrackModel.findOne({ spotifyId }).lean();
  return track;
};

export const findAllTracks = async () => {
  return await TrackModel.find();
};

// Find one track by any field
export const findTrack = async (
  query: FilterQuery<Track>,
  options: QueryOptions = {}
) => {
  return await trackModel.findOne(query, {}, options);
};
