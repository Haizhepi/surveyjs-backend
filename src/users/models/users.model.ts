import { Document, Model, model, Types, Schema } from "mongoose";
import { User } from "../dto/users.dto";
import * as bcrypt from "bcrypt";

interface UserDocument extends User, Document {}
export interface UserModel extends Model<UserDocument> {}

const UserSchema = new Schema<UserDocument, UserModel>({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  finished_prereq: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "participant",
    enum: ["participant", "experimenter", "admin"],
  },
  status: {
    type: String,
    default: "not_verified",
    enum: ["new", "returning", "not_verified"],
  },
});

UserSchema.pre<UserDocument>("save", async function () {
  if (this.isModified("password")) {
    // this.password = hashPassword(this.password)
    this.password = await bcrypt.hash(this.password, 12);
  }
});

export default model<UserDocument, UserModel>("User", UserSchema);
