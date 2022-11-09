import { Request, Response } from "express";

import { Product } from "../models/product";

export async function getProducts(req: Request, res: Response) {
  const man = await Product.find(
    { category: "H&M MAN" },
    {},
    { skip: 0, limit: 8 }
  );
  const man2 = await Product.find(
    { category: "H&M MAN" },
    {},
    { skip: 8, limit: 8 }
  );
  const woman = await Product.find(
    { category: "H&M WOMAN" },
    {},
    { skip: 0, limit: 8 }
  );
  res.send({ man, woman, man2 });
}

export async function getProductsMen(req: Request, res: Response) {
  if (typeof parseInt(req.params.page) === "number") {
    let page: number = parseInt(req.params.page);
    if (page === undefined) {
      page = 0;
    }
    if (typeof page === "number") {
      if (page >= 0) {
        const skip = (page - 1) * 8;
        const limit = page * 8;
        const response = await Product.find(
          { category: "H&M MAN" },
          {},
          { skip: skip, limit: limit }
        );
        return res.send(response);
      }
    }
  }
  const response = await Product.find(
    { category: "H&M WOMAN" },
    {},
    { skip: 0, limit: 8 }
  );
  res.send(response);
}
