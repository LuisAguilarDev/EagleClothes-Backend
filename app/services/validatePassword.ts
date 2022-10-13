import * as bcrypt from "bcryptjs";

import { User } from "../models/user";

export async function validatePassword(user: any) {
  const data: any = await User.find({ email: user.email });
  return bcrypt.compareSync(user.password, data[0].passwordHash);
}
