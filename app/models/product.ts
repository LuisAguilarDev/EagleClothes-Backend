import { model, Schema } from "mongoose";
//Other properties of main Product from api
//   visible: Boolean,
//   numbersOfPieces: Number,
//   sale: Boolean,
//   ticket: String,
//   searchEngineProductId: String,
//   dummy: Boolean,
//   linkPdp: String,
//   categoryName: String,
//   ecoTaxValue: Number,
//   swatchesTotal: Number,
//   showPriceMarker: Boolean,
//   redirectToPdp: Boolean,
//   mainCategoryCode: String,
//   comingSoon: Boolean,
//   brandName: String,

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
