import { User } from "./../models/user";

export default async function SingIn(req: any, res: any) {
  const email = req.body.email! !== undefined ? req.body.email : "";
  const password = req.body.password! !== undefined ? req.body.password : "";
  if (email) {
    return res.status(400).json({
      message: "please send email and password",
    });
  }

  const user = await User.findOne({ email: email });
  if (user) {
    const isMatch = user.comparePassword(password);
    if (isMatch) {
      const token = user.createToken();
      return res.json({ user, token });
    }
  }
  return res.status(401).json({ message: "permision denied" });
}
