import * as bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { createToken } from "../services/createToken";
import { transporter } from "../services/validateEmail";
import { validatePassword } from "../services/validatePassword";
import { IUser, User } from "./../models/user";

dotenv.config({ path: "./../../.env" });

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
    const token = await createToken(user);
    transporter.sendMail({
      from: `"Eagle Clothes" <eagle.clothes.store@gmail.com>`,
      to: `${email}`,
      subject: "Please verify your email",
      text: "confirm email",
      html: `<a href="http://localhost:5173/validateUser?token=${token}">Please confirm your email</a>`,
    });
    return res.json({
      user: answer,
      token,
      message: "User created successfully please verify your email",
    });
  }
}

export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body;

  const user: any = await User.findOne({ email: email });
  const userValidate = {
    email: user.email,
    password: password,
    name: user.name,
    verified: user.verified,
  };
  const userBase: IUser = {
    email: user.email,
    passwordHash: user.passwordHashed,
    name: user.name,
    verified: user.verified,
  };
  if (!user?.verified) {
    async function isTest(userInfo: any) {
      const token = await createToken(userInfo);
      transporter.sendMail({
        from: `"Eagle Clothes" <eagle.clothes.store@gmail.com>`,
        to: `${userInfo.email}`,
        subject: "Please verify your email",
        text: "confirm email",
        html: `<a href="http://localhost:5173/validateUser?token=${token}">Please confirm your email</a>`,
      });
    }
    isTest(userBase);
    return res.status(403).json({ message: "Please validate your email" });
  }
  if (user) {
    const isMatch = await validatePassword(userValidate);
    if (isMatch) {
      const token = await createToken(userBase);
      return res.json({ token, user, message: "Successful login" });
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

export async function validateUser(req: Request, res: Response) {
  const { token } = req.params;
  const decodedToken = jwt.decode(token);
  const secret: string =
    process.env.SECRET !== undefined ? process.env.SECRET : "";
  try {
    jwt.verify(token, secret);
  } catch (error) {
    console.log(error);
    return res.status(401).send({ message: "Invalid Token" });
  }
  async function isTest(userInfo: any) {
    if (userInfo as IUser) {
      const answer = await User.findOne({ email: userInfo.email });
      if (answer) {
        await User.updateOne(
          { email: userInfo.email },
          { verified: true },
          { upsert: true }
        );
        const token = await createToken(answer);
        return res.json({ token, answer, message: "Successful login" });
      }
    }
    return res.status(404).send({ message: "Invalid Request" });
  }
  isTest(decodedToken);
}
