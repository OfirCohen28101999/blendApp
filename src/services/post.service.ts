import postModel, { Post } from "../models/post.model";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { User } from "../models/user.model";
import { findTrackBySpotifyId } from "./track.service";

// create
export const createPost = async (
  partialPostInput: Partial<Post>,
  trackId: string,
  user: User
) => {
  const track = await findTrackBySpotifyId(trackId);
  const post = await postModel.create({
    creatingUser: user,
    track,
    partialPostInput,
  });
  await post.populate("creatingUser", "track");
  return post.toJSON();
};

// find post by id
export const findPostById = async (id: string) => {
  const post = await postModel.findById(id).lean();
  return post;
};

// get all posts
export const findAllPosts = async () => {
  return await postModel.find();
};

// can find by user id
export const findPost = async (
  query: FilterQuery<Post>,
  options: QueryOptions = {}
) => {
  return await postModel.findOne(query, {}, options);
};

// update
export const findAndUpdatePost = async (
  query: FilterQuery<Post>,
  update: UpdateQuery<Post>,
  options: QueryOptions
) => {
  return await postModel.findOneAndUpdate(query, update, options);
};

// delete
export const deletePostById = async (id: string) => {
  const post = await postModel.deleteOne({ id }).lean();
  return post;
};
