import { Router } from "express";

import * as productController from "../controllers/product";

const productRouter = Router();

productRouter.get("/", productController.getProductMen);
productRouter.get("/:page", productController.getProductMen);

export default productRouter;
