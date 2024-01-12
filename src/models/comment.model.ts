import {
  Ref,
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";
import { User } from "./user.model";
import { Post } from "./post.model";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Comment {
  @prop({ ref: () => User, required: true, unique: false })
  public creatingUser: Ref<User>;

  @prop({ ref: () => Post, required: true, unique: false })
  public post: Ref<Post>;

  @prop({ required: true })
  title: string;

  @prop({ required: true })
  description: string;
}

const commentModel = getModelForClass(Comment);
export default commentModel;
