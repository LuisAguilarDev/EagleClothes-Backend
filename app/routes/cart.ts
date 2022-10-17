import { Router } from "express";

import * as cartController from "../controllers/cart";
import { auth } from "../middleware/passport-jwt";

const cartRouter = Router();

cartRouter.post("/", auth, cartController.postCart);
cartRouter.delete("/", auth, cartController.deleteCart);
cartRouter.get("/", auth, cartController.getCart);

export default cartRouter;
