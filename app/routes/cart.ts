import { Router } from "express";

import * as cartController from "../controllers/cart";
import { auth } from "../middleware/passport-jwt";

const cartRouter = Router();

cartRouter.post("/", auth, cartController.postCart);
cartRouter.delete("/all", auth, cartController.deleteAllCart);
cartRouter.delete("/:code", auth, cartController.deleteCart);
cartRouter.get("/", auth, cartController.getCart);
cartRouter.get("/updateQuantity", auth, cartController.updateQuantity);

export default cartRouter;
