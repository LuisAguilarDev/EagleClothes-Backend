import { User, user } from "../models/user";
import { createToken } from "./createToken";
import { validatePassword } from "./validatePassword";

export default async function SingIn(usuario: user) {
  const user = await User.findOne({ email: usuario.email });
  if (user) {
    const isMatch = await validatePassword(usuario);
    if (isMatch) {
      const token = await createToken(user);
      return { token, user };
    }
  }
  return { message: "permision denied" };
}
