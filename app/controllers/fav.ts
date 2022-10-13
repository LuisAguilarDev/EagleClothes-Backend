import { Request, Response } from "express";

import { Favs } from "../models/favs";
import { IUser, User } from "../models/user";

export async function createFav(req: Request, res: Response) {
  const userBase: any = req.user;
  type userBase = IUser;
  const fav = {
    code: req.body.code,
    name: req.body.name,
    price: req.body.price,
    img: req.body.img,
    color: req.body.color,
  };
  const email = userBase.email;

  const created = await User.findOne({
    email,
  });
  if (created === null) {
    return res.json({ message: "You need to login first" });
  } else {
    const isUpdated = await Favs.updateOne(
      { userId: created._id },
      { $push: { favoritos: fav } },
      { upsert: true }
    );
    res.json({ isUpdated, message: "favorite added" });
  }
}

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

// export async function deleteFav(fav: Fav, user: any) {
//   const created = await User.findOne({ email: user });
//   const favs = await Favs.findOne({ name: fav.name });
//   const isUpdated = await User.updateOne(
//     { _id: created!._id! },
//     { $pull: { favs: favs!._id } }
//   );
//   console.log(isUpdated);
//   return { message: "se ha eliminado el favorito" };
// }

// export async function getFav(fav: Fav, user: string) {
//   const created = await User.findOne({ email: user });
//   //   if (created?.favs?.length === 0) return { message: "user has no favorites" };
//   if (created?.favs?.length === 1) {
//     const favs = await Favs.find({ _id: created.favs?.[0] });
//     return favs;
//   }
//   const objQuery = created?.favs?.map((f) => {
//     return { _id: f };
//   });
//   const favs = await Favs.find({ $or: objQuery });
//   return favs;
// }
