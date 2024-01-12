import TrackModel, { Track } from "../models/track.model";
import { FilterQuery, QueryOptions } from "mongoose";
import trackModel from "../models/track.model";

// todo: working!
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

// todo: working!
export const findTrackBySpotifyId = async (spotifyId: string) => {
  const track = await TrackModel.findOne({ spotifyId }).lean();
  return track;
};

// todo: working!
// need to create an api, routes for all songs, get by track name/artist name
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
