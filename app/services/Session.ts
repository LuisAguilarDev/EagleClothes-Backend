import * as bcrypt from "bcryptjs";

import { User, user } from "../models/user";

// import passport from "passport";
export interface Session {
  id: number;
  dateCreated: number;
  username: string;
  issued: number;
  expires: number;
}

export interface LocalStrategy {
  id: number;
  dateCreated: number;
  username: string;
  issued: number;
  expires: number;
}

// export interface LocalStrategy {
//     function: Function (username:string, password:string, cb:Function);
// }

export async function createSession(user: user) {
  const { email, passwordHash } = user;
  const login = await User.find({
    email: email,
  });
  const hash: string =
    login[0]?.passwordHash !== undefined ? login[0]?.passwordHash : "";

  const answer = bcrypt.compareSync(passwordHash, hash);
  if (!answer) {
    return { message: "contraseña invalida" };
  }
  if (login) return login;
}

// passport.use(
//   new LocalStrategy(function verify(username, password, cb) {
//     const user = User.find({
//       username: username,
//     });

//     if (user.username === username) {
//       return cb(null, false, { message: "Incorrect username or password." });
//     }

//     const hash: string =
//       user[0]?.passwordHash !== undefined ? user[0]?.passwordHash : "";

//     const answer = bcrypt.compareSync(password, hash);
//     if (!answer) {
//       return { message: "Incorrect username or password." };
//     }
//     return cb(null, user);
//   })
// );
