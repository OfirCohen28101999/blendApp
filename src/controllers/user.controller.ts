import { NextFunction, Request, Response } from "express";
import { findAllUsers, findAndUpdateUser } from "../services/user.service";
import { UpdateUserInput } from "../schemas/user.schema";

export const getMeHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllUsersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await findAllUsers();
    res.status(200).json({
      status: "success",
      result: users.length,
      data: {
        users,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

// todo: test image
export const updateUserHandler = async (
  req: Request<{}, {}, UpdateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    const updatedUser = await findAndUpdateUser(
      { _id: user._id },
      {
        name: req.body.name,
        image: req.body.image,
        bio: req.body.bio,
      },
      { upsert: true, runValidators: true, new: true, lean: true }
    );

    return res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
