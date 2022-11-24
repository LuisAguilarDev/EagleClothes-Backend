import axios from "axios";
import { Request, Response } from "express";

import { Address, Iaddress, IUaddress } from "../models/address";
import { mercadopago } from "../services/mercadopago";
import { createOrder } from "./order";

export type productType = {
  quantity?: number;
  category: string;
  code: string;
  name: string;
  pk: number;
  price: {
    value: number;
    formattedValue: string;
  };
  variantSizes: [{ filtercode: string }];
  color: [string];
  colorName: [string];
  galleryImages: [{ url: string }];
  images: string;
};

export async function pay(req: Request, res: Response) {
  const user: any = req.user;
  console.log(user, "USER?");
  const items = req.body;
  const itemsToSend = items.map((p: productType) => {
    return {
      picture_url: p.images,
      title: p.name,
      unit_price: Math.ceil(p.price.value * 5000),
      quantity: p.quantity,
    };
  });
  itemsToSend.push({
    title: "shipping",
    unit_price: Math.ceil(5 * 5000),
    quantity: 1,
  });

  if (user !== undefined) {
    const IVA = "IVA";
    const APPROVED = "approved";
    const RUT = "RUT";
    console.log(user, "usuario¿?");
    const preference = {
      items: itemsToSend,
      payer: {
        name: user.name,
        email: user.email,
        identification: { type: "RUT" as typeof RUT, number: "12345678" },
      },
      paymentMethods: { default_payment_method_id: "ticket" },
      back_urls: {
        success: "http://localhost:5173/orderConfirm",
        failure: "http://localhost:5173/orderConfirm",
        pending: "http://localhost:5173/orderConfirm",
      },
      // auto_return: "approved" as typeof APPROVED,
      taxes: [
        {
          type: "IVA" as typeof IVA,
          value: 16,
        },
      ],
    };

    mercadopago.preferences
      .create(preference)
      .then((response: any) => {
        console.log(response);
        return res.send({
          global: response.body.id,
        });
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }
}

export async function confirm(req: Request, res: Response) {
  const user: any = req.user;
  const { id }: any = req.params;
  const cart = req.body;
  const Authorization = process.env.PROD_ACCESS_TOKEN
    ? "Bearer " + process.env.PROD_ACCESS_TOKEN
    : "";

  function shoppingCartTotal() {
    if (cart.length === 0) {
      return;
    }
    const answer = cart.map((p: productType) => {
      const quantity: number = p.quantity ? p.quantity : 0;
      const price: number = p.price.value ? p.price.value : 0;
      const total = quantity * price;
      return total * 5000;
    });
    answer.push(25000);
    let total = answer.reduce((a: any, b: any) => a + b, 0);
    total = total ? total : 0;
    const data = Math.round(total * 100) / 100;
    return data;
  }
  const total = shoppingCartTotal();
  console.log(total);
  const idNumber: number = id ? id * 1 : 0;
  const address: Iaddress | null = await Address.findOne({
    userId: user.id,
  });
  axios
    .get(`https://api.mercadopago.com/v1/payments/${id}`, {
      headers: { Authorization },
    })
    .then((response) => {
      if (total !== response.data.transaction_details.total_paid_amount) {
        return res.send({
          message: `Contact us via +576011234567, with this payment id=${id} to confirm your order`,
          icon: "error",
        });
      }
      if (
        total === response.data.transaction_details.total_paid_amount &&
        response.data.status === "approved"
      ) {
        if (total !== undefined && address !== null) {
          createOrder(user, cart, true, total, idNumber, address.address);
        }
        return res.send({
          message: `Order Confirmed`,
          icon: "confirm",
        });
      }
    });
}
