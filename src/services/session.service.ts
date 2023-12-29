import { User } from "../models/user.model";
import sessionModel from "../models/session.model";
import { findUser } from "./user.service";

export const createSession = async (input: Partial<User>) => {
  const user = await findUser({ email: input.email });
  const session = await sessionModel.create({ user: user });
  await session.populate("user");
  return session.toJSON();
};

export const invalidateAllUserSessions = async (input: Partial<User>) => {
  const user = await findUser(input);
  await sessionModel.updateMany({ user: user?.id }, { valid: false });
};

export const findValidSessionsByUserId = async (id: string) => {
  const user = await findUser({ _id: id });
  const sessions = await sessionModel
    .find({ user: user?.id, valid: true })
    .populate("user")
    .lean();
  return sessions;
};
