import { Router } from "express";
import passport from "passport";

import { createUser } from "../services/CreateUser";
import deleteUser from "../services/DeleteUser";
import { createSession } from "../services/Session";
import { user } from "./../models/user";
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
  const answer = await singIn(req.body);
  res.json(answer);
});

usersRouter.delete(
  "/singIn",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const answer = await deleteUser(req.body);
    res.json(answer);
  }
);

export { usersRouter };
