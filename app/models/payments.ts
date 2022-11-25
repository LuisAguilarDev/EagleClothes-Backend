import { model, Schema } from "mongoose";

const paymentSchema = new Schema({
  paymentId: { type: Number, unique: true, required: true },
  valid: { type: Boolean, default: true },
});

paymentSchema.set("toJSON", {});

const Payment = model("Payment", paymentSchema);

export { Payment };
