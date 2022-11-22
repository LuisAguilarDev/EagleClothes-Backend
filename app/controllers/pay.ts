import axios from "axios";
import { Request, Response } from "express";

import { Product } from "../models/product";
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
  const items = req.body;
  const itemsToSend = items.map((p: productType) => {
    console.log(p.name);
    return {
      title: p.name,
      unit_price: Math.ceil(p.price.value),
      quantity: p.quantity,
    };
  });

  const preference = {
    items: itemsToSend,
    back_urls: {
      success: "http://localhost:5173/feedback",
      failure: "http://localhost:5173/feedback",
      pending: "http://localhost:5173/feedback",
    },
    auto_return: "approved",
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

export async function Preference(req: Request, res: Response) {
  const { items } = req.body.items;
  console.log("entre");

  const preference = {
    items: items,
    back_urls: {
      success: "http://localhost:5173/feedback",
      failure: "http://localhost:5173/feedback",
      pending: "http://localhost:5173/feedback",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then((res: any) => {
      return res.json({
        id: res.body.id,
      });
    })
    .catch(function (error: any) {
      console.log(error);
    });
}
