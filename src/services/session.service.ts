import uuid from "uuid";
import { User } from "../models/user.model";
import sessionModel from "../models/session.model";
import { findUser } from "./user.service";

export const createSession = async (input: Partial<User>) => {
  const user = await findUser({ email: input.email });
  const session = await sessionModel.create({ id: uuid.v4(), user });
  const sesss = await sessionModel.findOne({ id: session.id });
  sesss?.populate("user");
  return session.toJSON();
};

export const invalidateAllUserSessions = async (input: Partial<User>) => {
  const user = await findUser({ email: input.email });
  await sessionModel.updateMany({ user: user?.id }, { valid: false });
};

export const findSessionByUserId = async (id: string) => {
  const user = await findUser({ id });
  return await sessionModel.find({ user: user?.id }).lean();
};
