import { model, Schema } from "mongoose";

const favsSchema = new Schema({
  id: Number,
});

favsSchema.set("toJSON", {});

const Favs = model("favs", favsSchema);

export = { Favs };
