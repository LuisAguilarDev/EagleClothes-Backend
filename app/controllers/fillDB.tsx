import axios from "axios";
import { Request, Response } from "express";

import { Product } from "../models/product";

export async function getProduct(req: Request, res: Response) {
  const { page } = req.params;
  axios
    .get("https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list", {
      headers: {
        "X-RapidAPI-Key": "fdf86d0a34msh75a7e3397de3e7ep1f30a8jsneaf8bfa964ab",
        "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
      },
      params: {
        country: "us",
        lang: "en",
        currentpage: page,
        pagesize: 30,
        categories: "ladies_all",
      },
    })
    .then(function (response: any) {
      response.data.results.map(async (p: any) => {
        const product = new Product({
          category: "H&M WOMAN",
          code: p.code,
          name: p.name,
          pk: p.pk,
          price: p.price,
          variantSizes: p.variantSizes,
          color: p.articles[0].color.code,
          colorName: p.articles[0].color.text,
          galleryImages: p.galleryImages,
          images: p.images[0].url,
        });
        await product.save();
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  return res.json({ message: "Database Updated" });
}
