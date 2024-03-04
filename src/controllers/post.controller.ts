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
import {
  createComment,
  findAndUpdateComment,
  findCommentsByPostId,
  findOneAndDeleteComment,
} from "../services/comment.service";
import fs from 'fs';

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

export const updatePostHandler = async (
  req: Request<UpdatePostInput["params"], {}, UpdatePostInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
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
  } catch (err: any) {
    next(err);
  }
};

export const deletePostHandler = async (
  req: Request<DeletePostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
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

export const deletePostImageHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const imageLocation = `${__dirname}/../../../public/posts/${req.params.postId}`;
    fs.unlink(imageLocation, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return res.status(500).json({ error: 'Failed to delete file' });
      }
      res.json({ message: 'File deleted successfully' });
    });
  } catch (err: any) {
    next(err);
  }
};

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
  } catch (err: any) {
    next(err);
  }
};

export const getCommentsByPostIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await findPostById(req.params.postId);
    const comments = await findCommentsByPostId(req.params.postId);

    if (!post || !comments) {
      return next(new AppError("Post with that ID not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        comments,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const createCommentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    const post = await findPostById(req.params.postId);

    if (!post) {
      return next(new AppError("Post with that ID not found", 404));
    }

    const comment = await createComment(
      {
        title: req.body.title,
        description: req.body.description,
      },
      post,
      user
    );

    res.status(201).json({
      status: "success",
      data: {
        comment,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateCommentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedComment = await findAndUpdateComment(
      { _id: req.params.commentId },
      req.body,
      {}
    );

    if (!updatedComment) {
      return next(new AppError("Comment with that ID not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        comment: updatedComment,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteCommentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comment = await findOneAndDeleteComment({
      _id: req.params.commentId,
    });

    if (!comment) {
      return next(new AppError("Comment with that ID not found", 404));
    }

    res.status(204).json({
      status: "success",
      data: {
        comment: null,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
