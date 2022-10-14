import { model, Schema } from "mongoose";

const favsSchema = new Schema({
  favoritos: [
    {
      code: String,
      name: String,
      price: Number,
      img: String,
      color: String,
    },
  ],
  userId: { type: Schema.Types.ObjectId, ref: "user" },
});

interface Fav {
  code: string;
  name: string;
  price: number;
  img: string;
  color: string;
}
// favsSchema.set("toJSON", {});

const Favs = model("Favs", favsSchema);

export { Fav, Favs };
