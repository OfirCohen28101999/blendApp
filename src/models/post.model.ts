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

  @prop({ required: true, nullable: false })
  title: string;

  @prop({ required: true, nullable: false })
  description: string;

  @prop({ default: "default.png" })
  image: string;
}

const postModel = getModelForClass(Post);
export default postModel;
