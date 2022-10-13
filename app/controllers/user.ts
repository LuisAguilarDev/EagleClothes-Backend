import { Router } from "express";
import passport from "passport";

import { user } from "../models/user";
import { createUser } from "../services/createUser";
import deleteUser from "../services/deleteUser";
import { createSession } from "../services/session";
import singIn from "../services/signIn";

const userRouter = Router();

userRouter.post("/signUp", async (req, res) => {
  const usuario: user = {
    email: req.body.email,
    name: req.body.name,
    passwordHash: req.body.password,
  };
  const answer = await createUser(usuario);
  res.json(answer);
});

userRouter.get("/", async (req, res) => {
  const usuario: user = {
    email: req.body.email,
    passwordHash: req.body.password,
  };
  const answer = await createSession(usuario);
  res.json(answer);
});

userRouter.post("/singIn", async (req, res) => {
  const answer = await singIn(req.body);
  res.json(answer);
});

userRouter.delete(
  "/singIn",
  // passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const answer = await deleteUser(req.body);
    res.json(answer);
  }
);

export { userRouter };
