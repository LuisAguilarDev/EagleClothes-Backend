import { model, Schema } from "mongoose";

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true },
  name: { type: String, required: true },
  passwordHash: { type: String, required: true },
  // favs: [{ type: Schema.Types.ObjectId, ref: "Favs" }],
  verified: { type: Boolean, default: false },
});

interface IUser {
  email: string;
  name?: string;
  passwordHash: string;
  verified: boolean;
}

userSchema.set("toJSON", {});

const User = model<IUser>("User", userSchema);

export { IUser, User };
