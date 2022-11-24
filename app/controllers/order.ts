import { Orders } from "../models/orders";

export async function createOrder(
  userBase: any,
  cart: any,
  confirmed: boolean,
  cartTotal: number,
  payment_id: number,
  address: any[]
) {
  const newOrder = {
    total: cartTotal,
    recipient: userBase.name,
    address: address[0],
    payment_method: "mercadopago",
    payment_id,
    items: cart,
    confirmed,
  };
  const actual: any = await Orders.findOne({ userId: userBase._id });
  if (actual) {
    if (actual.order.length !== 0) {
      const find = actual.order.find((x: any) => {
        return x.payment_id === payment_id;
      });
      if (find) {
        if (find.payment_id === payment_id) {
          return { message: "Order is already added" };
        }
      }
    }
  }
  const isUpdated = await Orders.updateOne(
    { userId: userBase.id },
    { $push: { order: newOrder } },
    { upsert: true }
  );
  return { isUpdated, newOrder, message: "Order added" };
}
