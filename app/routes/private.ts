import { Router } from "express";

import { auth } from "../middleware/passport-jwt";

const logged = Router();

logged.get("/", auth, (request, response, next) => {
  response.json({ message: "You are logged in" });
  next();
});

export default logged;
