import { Router } from "express";
import passport from "passport";

import { createFav } from "../services/fav";

const favs = Router();

favs.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = req.body.user.email;
    const fav = {
      code: req.body.code,
      name: req.body.name,
      price: req.body.price,
      img: req.body.img,
      color: req.body.color,
    };
    const answer = await createFav(fav, user);
    res.json(answer);
  }
);

// favs.delete(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     const user = req.body.user.email;
//     const fav = {
//       code: req.body.code,
//       name: req.body.name,
//       price: req.body.price,
//       img: req.body.img,
//       color: req.body.color,
//     };
//     const answer = await deleteFav(fav, user);
//     res.json(answer);
//   }
// );

// favs.get(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     const user = req.body.user.email;
//     const fav = {
//       code: req.body.code,
//       name: req.body.name,
//       price: req.body.price,
//       img: req.body.img,
//       color: req.body.color,
//     };
//     const answer = await getFav(fav, user);
//     res.json(answer);
//   }
// );

export default favs;
