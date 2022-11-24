import { model, Schema } from "mongoose";

const ordersSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  orders: [],
});

const Orders = model("Orders", ordersSchema);

export { Orders };
