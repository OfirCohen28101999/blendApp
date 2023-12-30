import {
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
} from "@typegoose/typegoose";
import bcrypt from "bcryptjs";

// todo: add more props according to https://docs.google.com/document/d/1Frm9Sxrkx5dhTBd2nslCDCwGM5cmNTxs/edit
@index({ email: 1 })
@pre<User>("save", async function () {
  // Hash password if the password is new or was updated
  if (!this.isModified("password")) return;

  // Hash password with costFactor of 12
  this.password = await bcrypt.hash(this.password, 12);
})
@modelOptions({
  schemaOptions: {
    // Add createdAt and updatedAt fields
    timestamps: true,
  },
})

// Export the User class to be used as TypeScript type
export class User {
  @prop()
  name: string;

  @prop({ unique: true, required: true })
  email: string;

  @prop({ required: true, minlength: 8, maxLength: 32, select: false })
  password: string;

  @prop({ default: "user" })
  role: string;

  @prop({ default: "default.png" })
  photo: string;

  @prop({ default: false })
  verified: boolean;

  @prop({ default: "local" })
  provider: string;

  // Instance method to check if passwords match
  async comparePasswords(hashedPassword: string, candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}

// Create the user model from the User class
const userModel = getModelForClass(User);
export default userModel;
