import commentModel, { Comment } from "../models/comment.model";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { Post } from "../models/post.model";
import { User } from "../models/user.model";

// create
export const createComment = async (
  partialCommentInput: Partial<Comment>,
  post: Post,
  user: User
) => {
  const comment = await commentModel.create({
    creatingUser: user,
    post,
    ...partialCommentInput,
  });

  await comment.populate("creatingUser");
  await comment.populate("post");

  return comment.toJSON();
};

// find comment by id
export const findCommentById = async (id: string) => {
  const comment = await commentModel
    .findById(id)
    .populate("creatingUser")
    .populate("post")
    .lean();
  return comment;
};

// get all comments by post id
export const findCommentsByPostId = async (postId: string) => {
  const comment = await commentModel
    .find({ post: postId })
    .populate("creatingUser")
    .populate("post");
  return comment;
};

export const findComment = async (
  query: FilterQuery<Comment>,
  options: QueryOptions = {}
) => {
  return await commentModel
    .findOne(query, {}, options)
    .populate("creatingUser")
    .populate("post");
};

// update
export const findAndUpdateComment = async (
  query: FilterQuery<Comment>,
  update: UpdateQuery<Comment>,
  options: QueryOptions
) => {
  return await commentModel.findOneAndUpdate(query, update, options);
};

// delete
export const findOneAndDeleteComment = async (
  query: FilterQuery<Post>,
  options: QueryOptions = {}
) => {
  return await commentModel.findOneAndDelete(query, options);
};
