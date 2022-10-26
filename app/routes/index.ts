import { Router } from "express";

import cartRouter from "./cart";
import favRouter from "./favs";
import productRouter from "./products";
import { usersRouter } from "./user";

const appRouter = Router();

appRouter.use("/api/users", usersRouter);
appRouter.use("/api/users/favs", favRouter);
appRouter.use("/api/users/cart", cartRouter);
appRouter.use("/api/users/product", productRouter);

export { appRouter };
