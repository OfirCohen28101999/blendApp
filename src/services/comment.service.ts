import commentModel, { Comment } from "../models/comment.model";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

// create
export const createComment = async (input: Comment) => {
  const comment = await commentModel.create(input);
  return comment.toJSON();
};

// find comment by id
export const findCommentById = async (id: string) => {
  const comment = await commentModel.findById(id).lean();
  return comment;
};

// get all comments by post id
export const findCommentsByPostId = async (postId: string) => {
  const comment = await commentModel.find({ post: postId });
  return comment;
};

export const findComment = async (
  query: FilterQuery<Comment>,
  options: QueryOptions = {}
) => {
  return await commentModel.findOne(query, {}, options);
};

// update
export const findAndUpdatePost = async (
  query: FilterQuery<Comment>,
  update: UpdateQuery<Comment>,
  options: QueryOptions
) => {
  return await commentModel.findOneAndUpdate(query, update, options);
};

// delete
export const deleteCommentById = async (id: string) => {
  const comment = await commentModel.deleteOne({ id }).lean();
  return comment;
};
