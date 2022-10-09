import dotenv from "dotenv";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";

import { User } from "./../models/user";

dotenv.config({ path: "./.env" });
export default new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
  },
  async (payload, done) => {
    try {
      const user = User.findById(payload._id);
      if (user) return done(null, user);
      return done(null, false);
    } catch (error) {
      return done(error);
    }
  }
);
