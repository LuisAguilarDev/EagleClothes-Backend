import { Router } from "express";

import { createUser } from "../services/CreateUser";
import { createSession } from "../services/Session";
import { IUser, user } from "./../models/user";
import singIn from "./../services/SignIn";

const usersRouter = Router();

usersRouter.post("/signUp", async (req, res) => {
  const usuario: user = {
    email: req.body.email,
    name: req.body.name,
    passwordHash: req.body.password,
  };
  const answer = await createUser(usuario);
  res.json(answer);
});

usersRouter.get("/", async (req, res) => {
  const usuario: user = {
    email: req.body.email,
    passwordHash: req.body.password,
  };
  const answer = await createSession(usuario);
  res.json(answer);
});

usersRouter.post("/singIn", async (req, res) => {
  const answer = await singIn(req, res);
  res.json(answer);
});

export { usersRouter };
