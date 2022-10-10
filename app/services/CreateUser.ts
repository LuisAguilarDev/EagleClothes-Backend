import * as bcrypt from "bcryptjs";

import { User, user } from "../models/user";

export async function createUser(user: user) {
  const { email, name, passwordHash } = user;
  const salt = bcrypt.genSaltSync(10);
  const created = await User.findOne({ email: email });
  if (created) {
    return {
      message: "el usuario ya se encuentra creado en el sistema",
    };
  }
  if (created === null) {
    const passwordHashed = bcrypt.hashSync(passwordHash, salt);
    const user = new User({
      email,
      name,
      passwordHash: passwordHashed,
    });
    const answer = await user.save();
    return answer;
  }
}
