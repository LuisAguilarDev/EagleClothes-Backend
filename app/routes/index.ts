import { Router } from "express";

import cartRouter from "./cart";
import favRouter from "./favs";
import { usersRouter } from "./user";

const appRouter = Router();

appRouter.use("/api/users", usersRouter);
appRouter.use("/api/users/favs", favRouter);
appRouter.use("/api/users/cart", cartRouter);

export { appRouter };
