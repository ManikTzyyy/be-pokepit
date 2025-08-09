import mongoose, { mongo } from "mongoose";
import { encrypt } from "../utils/encrpyt";

export interface User {
  username: string;
  email: string;
  password: string;
  profilePicture: String;
  role: string;
}

const Schema = mongoose.Schema;

const UserSchema = new Schema<User>({
  username: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  profilePicture: {
    type: Schema.Types.String,
    default: "user.jpg",
  },
  role: {
    type: Schema.Types.String,
    enum: ["admin", "user"],
    default: "user",
  },
});

UserSchema.pre("save", function (next) {
  const user = this;
  user.password = encrypt(user.password);
  next();
});

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
