import dotenv from "dotenv";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import { IUser } from "../models/user";
import { createToken } from "../services/createToken";
import { transporter } from "../services/validateEmail";

const secret: string =
  process.env.SECRET !== undefined ? process.env.SECRET : "";

dotenv.config({ path: "./.env" });

const auth: RequestHandler = (req, res, next) => {
  if (req.headers["authorization"]) {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ message: "Access denied" });
    }
    const tokenBody = token.slice(7);
    const decodedToken = jwt.decode(tokenBody);
    const { verified } = <IUser>decodedToken;
    if (decodedToken) req.user = <IUser>decodedToken;
    if (!verified) {
      const userInfo = { ...req.user };
      async function isTest(userInfo: any) {
        if (userInfo as IUser) {
          const token = await createToken(userInfo);
          const answer = transporter.sendMail({
            from: `"Eagle Clothes" <eagle.clothes.store@gmail.com>`,
            to: `${userInfo.email}`,
            subject: "Please verify your email",
            text: "confirm email",
            html: `<a href="https://eagleclothes.vercel.app/user/validate/tokenToValidate/${token}">Please confirm your email</a>`,
          });
        }
        return false;
      }
      isTest(userInfo);
      return res.status(401).json({ message: "Verify your email to continue" });
    }
    try {
      jwt.verify(tokenBody, secret);
    } catch (error) {
      return res.status(401).send({ message: "Invalid Token" });
    }
    return next();
  }
  res.status(401).json({ message: "Access denied" });
};

export { auth };
