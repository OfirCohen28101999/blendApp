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
  @prop({ ref: () => User, nullable: false, required: true, unique: false })
  public creatingUser: Ref<User>;

  @prop({ ref: () => Post, nullable: false, required: true, unique: false })
  public post: Ref<Post>;

  @prop({ required: true, nullable: false })
  title: string;

  @prop({ required: true, nullable: false })
  description: string;
}

const commentModel = getModelForClass(Comment);
export default commentModel;
