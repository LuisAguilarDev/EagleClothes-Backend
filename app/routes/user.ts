import { Router } from "express";

import * as userController from "../controllers/user";
import { auth } from "../middleware/passport-jwt";

const usersRouter = Router();

usersRouter.post("/signUp", userController.createUser);

usersRouter.post("/singIn", userController.signIn);

usersRouter.delete("/singIn", auth, userController.deleteUser);

usersRouter.get("/validateUser/:token", userController.validateUser);

export { usersRouter };
