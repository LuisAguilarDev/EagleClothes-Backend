import { User, user } from "./../models/user";

export default async function (usuario: user) {
  await User.deleteOne({ email: usuario.email });
  return { message: "el usuario ha sido borrado correctamente" };
}
