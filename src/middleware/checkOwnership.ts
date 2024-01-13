import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { User } from "../models/user.model";
import { findPostById } from "../services/post.service";
import { findCommentById } from "../services/comment.service";

export const checkPostOwnership = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: User | undefined = res.locals.user;
  const post = await findPostById(req.params.postId);

  // @ts-ignore
  if (post && user && post.creatingUser._id !== user._id) {
    return next(
      new AppError("You are not allowed to perform this action", 403)
    );
  }

  next();
};

export const checkCommentOwnership = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: User | undefined = res.locals.user;
  const comment = await findCommentById(req.params.commentId);

  // @ts-ignore
  if (comment && user && comment.creatingUser._id !== user._id) {
    return next(
      new AppError("You are not allowed to perform this action", 403)
    );
  }

  next();
};
