import * as bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { model, Schema } from "mongoose";

dotenv.config({ path: "./.env" });

const secret: string =
  process.env.SECRET !== undefined ? process.env.SECRET : "";

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  passwordHash: String,
  favs: [{ type: Schema.Types.ObjectId, ref: "Favs" }],
});

interface IUser {
  email: string;
  name?: string;
  passwordHash: string;
  favs?: [{ type: Schema.Types.ObjectId; ref: "Favs" }];
  comparePassword(password: string): boolean;
  createToken(): string;
}

interface user {
  email: string;
  name?: string;
  passwordHash: string;
}
userSchema.methods.comparePassword = function (password: string) {
  const user = this;
  const userObject = user.toObject();
  return bcrypt.compareSync(password, userObject.passwordHash);
};

userSchema.methods.createToken = function (password: string) {
  const user = this;
  return jwt.sign(
    { id: user.id, email: user.email, password: password },
    secret,
    {
      expiresIn: 86400,
    }
  );
};

userSchema.set("toJSON", {});

const User = model<IUser>("user", userSchema);

export { IUser, User, user };
