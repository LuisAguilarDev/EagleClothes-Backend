import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: String,
  name: String,
  passwordHash: String,
  favs: [{ type: Schema.Types.ObjectId, ref: "Favs" }],
});

userSchema.set("toJSON", {});

const User = model("user", userSchema);

module.exports = { User };
