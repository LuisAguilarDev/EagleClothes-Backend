import { User, user } from "./../models/user";

export default async function SingIn(usuario: user) {
  console.log(usuario);
  const email = usuario.email !== undefined ? usuario.email : "";
  const password = usuario.password !== undefined ? usuario.password : "";
  console.log(email, password);
  if (!email) {
    return {
      message: "please send email and password",
    };
  }

  const user = await User.findOne({ email: email });
  if (user) {
    const isMatch = user.comparePassword(password);
    if (isMatch) {
      const token = user.createToken();
      return { token, user };
    }
  }
  return { message: "permision denied" };
}
