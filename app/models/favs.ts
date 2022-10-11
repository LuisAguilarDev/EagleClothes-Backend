import { model, Schema } from "mongoose";

const favsSchema = new Schema({
  code: String,
  name: { type: String, required: true, unique: true },
  price: Number,
  img: String,
  color: String,
});

interface fav {
  code: string;
  name: string;
  price: number;
  img: string;
  color: string;
}
favsSchema.set("toJSON", {});

const Favs = model("favs", favsSchema);

export { fav, Favs };
