import { Router } from "express";

import addressRouter from "./address";
import cartRouter from "./cart";
import favRouter from "./favs";
import payRouter from "./pay";
import productRouter from "./products";
import { searchRouter } from "./search";
import { usersRouter } from "./user";

const appRouter = Router();

appRouter.use("/api/users", usersRouter);
appRouter.use("/api/users/favs", favRouter);
appRouter.use("/api/users/cart", cartRouter);
appRouter.use("/api/users/product", productRouter);
appRouter.use("/api/search", searchRouter);
appRouter.use("/api/users/address", addressRouter);
appRouter.use("/api/pay", payRouter);

export { appRouter };
