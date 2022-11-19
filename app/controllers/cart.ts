import { Request, Response } from "express";

import { product } from "../models/product";
import { Cart } from "../models/shoppingCart";
import { IUser, User } from "../models/user";

export async function postCart(req: Request, res: Response) {
  const userBase: IUser | any = req.user;
  const product = {
    code: req.body.code,
    name: req.body.name,
    pk: req.body.pk,
    price: req.body.price,
    variantSizes: req.body.variantSizes,
    color: req.body.color,
    colorName: req.body.colorName,
    galleryImages: req.body.galleryImages,
    images: req.body.images,
    quantity: req.body.quantity,
  };
  const created = await User.findOne({
    _id: userBase.id,
  });
  if (created === null) {
    return res.json({ message: "You need to login first" });
  } else {
    const actual: any = await Cart.findOne({ userId: created._id });
    if (actual) {
      if (actual.cart.length !== 0) {
        const index = actual.cart.findIndex((p: product) => {
          return p.code === product.code;
        });
        if (index === -1) {
          const isUpdated = await Cart.updateOne(
            { userId: created._id },
            { $push: { cart: product } },
            { upsert: true }
          );
          return res.json({ isUpdated, message: "Product added" });
        }
        const cart = actual.cart;

        cart[index].quantity = cart[index].quantity + product.quantity;
        const isUpdated = await Cart.updateOne(
          { userId: created._id },
          { cart: [...cart] },
          { upsert: true }
        );
        console.log(isUpdated);
        return res.json({ isUpdated, message: "Product quantity updated" });
      }
    }
    console.log("llegue hasta aqui?");
    const isUpdated = await Cart.updateOne(
      { userId: created._id },
      { $push: { cart: product } },
      { upsert: true }
    );
    return res.json({ isUpdated, message: "Product added" });
  }
}

export async function deleteCart(req: any, res: Response) {
  const userBase: any = req.user;
  const { code } = req.params;
  const cart: any = await Cart.findOne({ userId: userBase.id });
  const edit = cart.cart.filter((c: any) => {
    return c.code !== code;
  });
  const isUpdated = await Cart.updateOne(
    { userId: userBase.id },
    { cart: edit }
  );
  res.json({
    isUpdated,
    message: "The item has been removed from your cart",
  });
}

export async function getCart(req: Request, res: Response) {
  const userBase: any = req.user;
  const created: any = await Cart.findOne({ userId: userBase.id });
  const cart = created?.cart?.length ? created.cart.length : 0;
  if (cart === 0) {
    return res.json({ cart: [], message: "User has no products add in cart" });
  }
  res.json({ cart: [created.cart], message: "product list" });
}

export async function updateQuantity(req: Request, res: Response) {
  const userBase: any = req.user;
  const { code, quantity } = req.body;
  const created: any = await Cart.findOne({ userId: userBase.id });
  const cart = created?.cart?.length ? created.cart.length : 0;
  if (cart === 0) {
    return res.json({ message: "User has no products add in cart" });
  }
  created.cart.map((p: product) => {
    if (p.code === code) {
      p.quantity = p.quantity + quantity;
    }
  });
  created.save();
  res.json({ cart: [created.cart], message: "product list" });
}
