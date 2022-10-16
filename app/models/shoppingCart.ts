import dotenv from "dotenv";
import { model, Schema } from "mongoose";

dotenv.config({ path: "./.env" });

const shoppingCartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  cart: [],
});

const Cart = model("Cart", shoppingCartSchema);

export { Cart };
