import { Router } from "express";

import * as ordersController from "../controllers/order";
import { auth } from "../middleware/passport-jwt";

const ordersRouter = Router();

ordersRouter.get("/", auth, ordersController.getOrders);

export default ordersRouter;
