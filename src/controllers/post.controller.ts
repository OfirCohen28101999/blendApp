import { NextFunction, Request, Response } from "express";
import {
  createPost,
  findAllPosts,
  findAndUpdatePost,
  findOneAndDelete,
  findPostById,
} from "../services/post.service";
import {
  UpdatePostInput,
  CreatePostInput,
  GetPostInput,
  DeletePostInput,
} from "../schemas/post.schema";
import { User } from "../models/user.model";
import AppError from "../utils/appError";

// todo: working!
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
  req: Request<{}, {}, CreatePostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: User = res.locals.user;
    const post = await createPost(
      {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
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

// todo: working!
// todo: need to add user validation so only the creating user can delete.
export const updatePostHandler = async (
  req: Request<UpdatePostInput["params"], {}, UpdatePostInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    const updatedPost = await findAndUpdatePost(
      { _id: req.params.postId },
      req.body,
      {}
    );

    if (!updatedPost) {
      return next(new AppError("Post with that ID not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        post: updatedPost,
      },
    });

    return res.status(200).json({ status: "success" });
  } catch (err: any) {
    next(err);
  }
};

// todo: working!
// todo: need to add user validation so only the creating user can delete.
export const deletePostHandler = async (
  req: Request<DeletePostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    const post = await findOneAndDelete({ _id: req.params.postId });
    if (!post) {
      return next(new AppError("Post with that ID not found", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};

// todo: working!
export const getPostByIdHandler = async (
  req: Request<GetPostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await findPostById(req.params.postId);

    if (!post) {
      return next(new AppError("Post with that ID not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
    return res.status(200).json({ status: "success" });
  } catch (err: any) {
    next(err);
  }
};

// COMMENTS RELATED SHIT

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
