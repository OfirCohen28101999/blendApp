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
  @prop({ unique: true, required: true })
  id: string;

  @prop({ ref: () => User })
  public user?: Ref<User>;

  @prop({ default: true })
  valid: Boolean;
}

const sessionModel = getModelForClass(Session);
export default sessionModel;
