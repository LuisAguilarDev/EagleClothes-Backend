import dotenv from "dotenv";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

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
    if (decodedToken) req.user = decodedToken;
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
