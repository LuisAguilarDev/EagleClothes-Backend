import { Product } from "../models/product";
import { data } from "./men";

export default function initial() {
  data.results.map(async (p) => {
    const product = new Product({
      category: "H&M MAN",
      code: p.code,
      name: p.name,
      pk: p.pk,
      price: p.price,
      variantSizes: p.variantSizes,
      color: p.articles[0].color.code,
      colorName: p.articles[0].color.text,
      galleryImages: p.galleryImages,
      images: p.images[0].url,
    });
    const isUpdated = await product.save();
    console.log(isUpdated);
  });
}
