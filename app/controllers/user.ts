import * as bcrypt from "bcryptjs";
import { Request, Response } from "express";

import { createToken } from "../services/createToken";
import { validatePassword } from "../services/validatePassword";
import { IUser, User } from "./../models/user";

export async function createUser(req: Request, res: Response) {
  const { email, name, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const created = await User.findOne({ email: email });
  if (created) {
    return res.json({
      message: "el usuario ya se encuentra creado en el sistema",
    });
  }
  if (created === null) {
    const passwordHashed = bcrypt.hashSync(password, salt);
    const user = new User({
      email,
      name,
      passwordHash: passwordHashed,
    });
    const answer = await user.save();
    return res.json({ answer, message: "User created successfully" });
  }
}

export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body;
  const userBase = {
    email,
    password,
  };
  const user = await User.findOne({ email: email });
  if (user) {
    const isMatch = await validatePassword(userBase);
    if (isMatch) {
      const token = await createToken(user);
      return res.json({ token, user });
    }
  }
  return res.json({ message: "permision denied" });
}

export async function deleteUser(req: Request, res: Response) {
  const userBase: any = req.user;
  type userBase = IUser;
  const answer = await User.deleteOne({ email: userBase.email });
  res.json({ answer, message: "User deleted successfully" });
}
