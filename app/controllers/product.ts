import axios from "axios";
import { Request, Response } from "express";

import { Product } from "../models/product";

export async function getProductMen(req: Request, res: Response) {
  if (typeof parseInt(req.params.page) === "number") {
    let page: number = parseInt(req.params.page);
    console.log(page);
    if (page === undefined) {
      page = 0;
    }
    console.log("entre");
    if (typeof page === "number") {
      if (page >= 0) {
        const skip = (page - 1) * 8;
        const limit = page + 1 * 10;
        console.log(limit);
        const response = await Product.find(
          { category: "H&M MAN" },
          {},
          { skip: skip, limit: limit }
        );
        console.log(response);
        return res.send(response);
      }
    }
  }
  const response = await Product.find(
    { category: "H&M MAN" },
    {},
    { skip: 0, limit: 8 }
  );
  console.log(response);
  res.send(response);
}
