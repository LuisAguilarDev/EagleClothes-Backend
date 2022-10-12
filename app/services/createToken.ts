import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { IUser, User, user } from "./../models/user";

dotenv.config({ path: "./.env" });

const secret: string =
  process.env.SECRET !== undefined ? process.env.SECRET : "";

export async function createToken(user: user) {
  const data: any = await User.find({ email: user.email });
  const token = jwt.sign(
    { id: data[0]._id, email: data[0].email, password: data[0].passwordHash },
    secret,
    {
      expiresIn: 86400,
    }
  );
  return token;
}