import { model, Schema } from "mongoose";

const ordersSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  order: [
    {
      orderId: { type: Schema.Types.ObjectId, ref: "order" },
      date: { type: Date, default: Date.now, required: true },
      estimated_delivery: {
        type: Date,
        default: () => Date.now() + 7 * 24 * 60 * 60 * 1000,
        required: true,
      },
      total: { type: Number, required: true },
      recipient: { type: String, required: true },
      address: [],
      payment_method: { type: String, default: "mercadopago" },
      payment_id: { type: Number, required: true },
      items: [],
      confirmed: { type: Boolean, default: false, required: true },
    },
  ],
});

const Orders = model("Orders", ordersSchema);

export { Orders };
