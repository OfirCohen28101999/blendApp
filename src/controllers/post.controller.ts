import { NextFunction, Request, Response } from "express";
import { createPost, findAllPosts } from "../services/post.service";
import { UpsertPostInput } from "../schemas/post.schema";
import { User } from "../models/user.model";
import AppError from "../utils/appError";

// todo: done needs to be checked
export const getAllPostsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await findAllPosts();
    res.status(200).json({
      status: "success",
      result: posts.length,
      data: {
        posts,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

// todo: working!
export const createPostHandler = async (
  req: Request<{}, {}, UpsertPostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: User = res.locals.user;
    const post = await createPost(
      {
        title: req.body.title,
        description: req.body.description,
        photo: req.body.photo,
      },
      req.body.trackId,
      user
    );

    res.status(201).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

// todo: needs to be implemented
export const updatePostHandler = async (
  req: Request<{}, {}, UpsertPostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    return res.status(200).json({ status: "success" });
  } catch (err: any) {
    next(err);
  }
};

// todo: needs to be implemented
export const deletePostHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    return res.status(200).json({ status: "success" });
  } catch (err: any) {
    next(err);
  }
};

// todo: needs to be implemented
export const getPostByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    return res.status(200).json({ status: "success" });
  } catch (err: any) {
    next(err);
  }
};

// todo: needs to be implemented
export const getCommentsByPostIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    return res.status(200).json({ status: "success" });
  } catch (err: any) {
    next(err);
  }
};

// todo: needs to be implemented
export const createCommentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    return res.status(200).json({ status: "success" });
  } catch (err: any) {
    next(err);
  }
};

// todo: needs to be implemented
export const updateCommentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    return res.status(200).json({ status: "success" });
  } catch (err: any) {
    next(err);
  }
};

// todo: needs to be implemented
export const deleteCommentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    return res.status(200).json({ status: "success" });
  } catch (err: any) {
    next(err);
  }
};
