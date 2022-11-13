import { Request, Response } from "express";

import { Product } from "../models/product";

export async function getProducts(req: Request, res: Response) {
  const { name } = req.params;
  const { category } = req.query;
  if (typeof category === "string") {
    console.log(decodeURI(category));
    if (category) {
      const search = await Product.find({
        category: decodeURI(category),
      });
      console.log(search);
      return res.json({ search, message: "product list" });
    }
  }
  const search = await Product.find({
    name: { $regex: name, $options: "i" },
  });
  res.json({ search, message: "product list" });
}
