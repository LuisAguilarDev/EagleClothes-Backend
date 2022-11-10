import { Request, Response } from "express";

import { Product } from "../models/product";

export async function getProducts(req: Request, res: Response) {
  const { name } = req.params;
  const search = await Product.find({ name: { $regex: name, $options: "i" } });
  res.json({ search, message: "product list" });
}
