import { model, Schema } from "mongoose";

export interface product {
  category: string;
  code: string;
  name: string;
  pk: number;
  price: {
    value: number;
    formattedValue: string;
  };
  variantSizes: [{ filtercode: string }];
  color: string[];
  colorName: string[];
  galleryImages: [{ url: string }];
  images: string;
  quantity?: number;
}

const productSchema = new Schema({
  category: String,
  code: String,
  name: String,
  pk: Number,
  price: {
    value: Number,
    formattedValue: String,
  },
  variantSizes: [{ filtercode: String }],
  color: [String],
  colorName: [String],
  galleryImages: [{ url: String }],
  images: String,
});

// favsSchema.set("toJSON", {});

const Product = model("Product", productSchema);

export { Product };
