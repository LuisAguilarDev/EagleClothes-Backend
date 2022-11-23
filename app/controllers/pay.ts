import axios from "axios";
import { Request, Response } from "express";
import { type } from "os";

import { Product } from "../models/product";
import { IUser } from "../models/user";
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
      unit_price: Math.ceil(p.price.value),
      quantity: p.quantity,
    };
  });
  if (user !== undefined) {
    const IVA = "IVA";
    const APPROVED = "approved";
    console.log(user, "usuario¿?");
    const preference = {
      items: itemsToSend,
      payer: { name: user.name, email: user.email },
      paymentMethods: [{ payment_type_id: "ticket" }],
      back_urls: {
        success: "http://localhost:5173/feedback",
        failure: "http://localhost:5173/feedback",
        pending: "http://localhost:5173/feedback",
      },
      auto_return: "approved" as typeof APPROVED,
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

const payment_methods = [
  {
    id: "codensa",
    name: "Crédito Fácil Codensa",
    payment_type_id: "credit_card",
    status: "active",
    secure_thumbnail:
      "https://www.mercadopago.com/org-img/MP3/API/logos/codensa.gif",
    thumbnail: "http://img.mlstatic.com/org-img/MP3/API/logos/codensa.gif",
    deferred_capture: "unsupported",
    min_allowed_amount: 100,
    max_allowed_amount: 5000000,
    accreditation_time: null,
    financial_institutions: [],
  },
  {
    id: "debvisa",
    name: "Visa Débito",
    payment_type_id: "debit_card",
    status: "active",
    secure_thumbnail:
      "https://www.mercadopago.com/org-img/MP3/API/logos/debvisa.gif",
    thumbnail: "https://www.mercadopago.com/org-img/MP3/API/logos/debvisa.gif",
    deferred_capture: "unsupported",
    min_allowed_amount: 1000,
    max_allowed_amount: 50000000,
    accreditation_time: 0,
    financial_institutions: [],
  },
  {
    id: "debmaster",
    name: "Mastercard Débito",
    payment_type_id: "debit_card",
    status: "active",
    secure_thumbnail:
      "https://www.mercadopago.com/org-img/MP3/API/logos/debmaster.gif",
    thumbnail:
      "https://www.mercadopago.com/org-img/MP3/API/logos/debmaster.gif",
    deferred_capture: "unsupported",
    min_allowed_amount: 1000,
    max_allowed_amount: 50000000,
    accreditation_time: 0,
    financial_institutions: [],
  },
  {
    id: "visa",
    name: "Visa",
    payment_type_id: "credit_card",
    status: "active",
    secure_thumbnail:
      "https://www.mercadopago.com/org-img/MP3/API/logos/visa.gif",
    thumbnail: "https://www.mercadopago.com/org-img/MP3/API/logos/visa.gif",
    deferred_capture: "supported",
    min_allowed_amount: 1000,
    max_allowed_amount: 50000000,
    accreditation_time: 2880,
    financial_institutions: [],
  },
  {
    id: "amex",
    name: "American Express",
    payment_type_id: "credit_card",
    status: "active",
    secure_thumbnail:
      "https://www.mercadopago.com/org-img/MP3/API/logos/amex.gif",
    thumbnail: "http://img.mlstatic.com/org-img/MP3/API/logos/amex.gif",
    deferred_capture: "unsupported",
    min_allowed_amount: 1000,
    max_allowed_amount: 50000000,
    accreditation_time: 2880,
    financial_institutions: [],
  },
  {
    id: "master",
    name: "Mastercard",
    payment_type_id: "credit_card",
    status: "active",
    secure_thumbnail:
      "https://www.mercadopago.com/org-img/MP3/API/logos/master.gif",
    thumbnail: "http://img.mlstatic.com/org-img/MP3/API/logos/master.gif",
    deferred_capture: "unsupported",
    min_allowed_amount: 1000,
    max_allowed_amount: 50000000,
    accreditation_time: 2880,
    financial_institutions: [],
  },
  {
    id: "diners",
    name: "Diners",
    payment_type_id: "credit_card",
    status: "active",
    secure_thumbnail:
      "https://www.mercadopago.com/org-img/MP3/API/logos/diners.gif",
    thumbnail: "http://img.mlstatic.com/org-img/MP3/API/logos/diners.gif",
    deferred_capture: "unsupported",
    min_allowed_amount: 1000,
    max_allowed_amount: 50000000,
    accreditation_time: 2880,
    financial_institutions: [],
  },
  {
    id: "efecty",
    name: "Efecty",
    payment_type_id: "ticket",
    status: "active",
    secure_thumbnail:
      "https://www.mercadopago.com/org-img/MP3/API/logos/efecty.gif",
    thumbnail: "http://img.mlstatic.com/org-img/MP3/API/logos/efecty.gif",
    deferred_capture: "does_not_apply",
    settings: [],
    additional_info_needed: [],
    min_allowed_amount: 5000,
    max_allowed_amount: 8000000,
    accreditation_time: 0,
    financial_institutions: [],
  },
  {
    id: "pse",
    name: "PSE",
    payment_type_id: "bank_transfer",
    status: "active",
    secure_thumbnail:
      "https://www.mercadopago.com/org-img/MP3/API/logos/pse.gif",
    thumbnail: "https://www.mercadopago.com/org-img/MP3/API/logos/pse.gif",
    deferred_capture: "does_not_apply",
    settings: [],
    min_allowed_amount: 1600,
    max_allowed_amount: 340000000,
    accreditation_time: 30,
  },
];
