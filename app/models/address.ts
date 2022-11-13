import dotenv from "dotenv";
import { model, Schema } from "mongoose";

dotenv.config({ path: "./.env" });

const addressSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  address: [],
});

const Address = model("Address", addressSchema);

export { Address };
