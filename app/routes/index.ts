import { Router } from "express";

import favRouter from "./favs";
import { usersRouter } from "./user";

const appRouter = Router();

appRouter.use("/api/users", usersRouter);
appRouter.use("/api/users/favs", favRouter);

export { appRouter };
