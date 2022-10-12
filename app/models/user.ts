import { model, Schema } from "mongoose";

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true },
  name: { type: String, required: true },
  passwordHash: String,
  // favs: [{ type: Schema.Types.ObjectId, ref: "Favs" }],
});

interface IUser {
  email: string;
  name?: string;
  passwordHash: string;
}

interface user extends IUser {
  password?: string;
}

userSchema.set("toJSON", {});

const User = model<IUser>("user", userSchema);

export { IUser, User, user };
