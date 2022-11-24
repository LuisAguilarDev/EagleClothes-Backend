import axios from "axios";
import { Request, Response } from "express";
import { Identification } from "mercadopago/shared/payer-identification";
import { type } from "os";

import { mercadopago } from "../services/mercadopago";

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
        success: "http://localhost:5173/api/pay/success",
        failure: "http://localhost:5173/api/pay/failure",
        pending: "http://localhost:5173/api/pay/pending",
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
  const { id } = req.params;
  const Authorization = process.env.PROD_ACCESS_TOKEN
    ? "Bearer " + process.env.PROD_ACCESS_TOKEN
    : "";
  axios
    .get(`https://api.mercadopago.com/v1/payments/${id}`, {
      headers: { Authorization },
    })
    .then((res) => {
      console.log(
        res.data.status,
        res.data.transaction_details.total_paid_amount
      );
    });
}
