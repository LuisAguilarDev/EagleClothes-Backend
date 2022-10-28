import { Router } from "express";

import * as productController from "../controllers/product";

const productRouter = Router();

productRouter.get("/", productController.getProducts);
productRouter.get("/:page", productController.getProductsMen);

export default productRouter;
