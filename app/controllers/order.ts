import { Request, Response } from "express";

import { Address, Iaddress, IUaddress } from "../models/address";
import { IOrder, IOrders, Orders } from "../models/orders";
import { IUser } from "../models/user";

export async function createOrder(
  userBase: any,
  cart: any,
  confirmed: boolean,
  cartTotal: number,
  payment_id: number,
  address: any[]
) {
  const newOrder: IOrder = {
    total: cartTotal,
    recipient: userBase.name,
    address: address[0],
    payment_method: "mercadopago",
    payment_id,
    items: cart,
    confirmed,
  };
  const actual = await Orders.findOne({ userId: userBase._id });
  if (actual) {
    if (actual.order.length !== 0) {
      const find: any = actual.order.find((x: any) => {
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

export async function getOrders(req: Request, res: Response) {
  const userBase: IUser | any = req.user;
  const OrdersList: any = await Orders.find({ userId: userBase.id });
  OrdersList[0].order.filter((o: any) => {
    return o.confirmed;
  });
  res.send(OrdersList[0].order);
}
