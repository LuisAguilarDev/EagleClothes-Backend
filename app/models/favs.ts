import { model, Schema } from "mongoose";

const favsSchema = new Schema({
  favoritos: [
    {
      code: String,
      name: String,
      pk: String,
      price: {},
      images: String,
      color: [],
      galleryImages: [],
      variantSizes: [],
      colorName: [],
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
  galleryImages: Array<string>;
}
// favsSchema.set("toJSON", {});

const Favs = model("Favs", favsSchema);

export { Fav, Favs };
