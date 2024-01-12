import {
  Ref,
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";
import { User } from "./user.model";
import { Track } from "./track.model";

@modelOptions({
  schemaOptions: { timestamps: true },
})
export class Post {
  @prop({ ref: () => User, required: true, unique: false })
  public creatingUser: Ref<User>;

  @prop({ ref: () => Track, required: true, unique: false })
  public track: Ref<Track>;

  @prop({ required: true })
  title: string;

  @prop({ required: true })
  description: string;

  @prop({ default: "default.png" })
  photo: string;
}

const postModel = getModelForClass(Post);
export default postModel;
