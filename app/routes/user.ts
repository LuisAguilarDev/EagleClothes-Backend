import { Router } from "express";

import { userRouter } from "../controllers/user";

const usersRouter = Router();

usersRouter.use("/", userRouter);

export { usersRouter };
