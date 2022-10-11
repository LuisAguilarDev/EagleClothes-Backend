import { Router } from "express";
import passport from "passport";

const logged = Router();

logged.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "You are logged in" });
  }
);

export default logged;
