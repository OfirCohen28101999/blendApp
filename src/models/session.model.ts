import {
  Ref,
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";
import { User } from "./user.model";

@modelOptions({
  schemaOptions: {
    // Add createdAt and updatedAt fields
    timestamps: true,
  },
})
export class Session {
  @prop({ ref: () => User, unique: false })
  public user: Ref<User>;

  @prop({ default: true })
  valid: Boolean;
}

const sessionModel = getModelForClass(Session);
export default sessionModel;
