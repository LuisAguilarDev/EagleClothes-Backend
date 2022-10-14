import { Request, Response } from "express";

import { Fav, Favs } from "../models/favs";
import { IUser, User } from "../models/user";

export async function createFav(req: Request, res: Response) {
  const userBase: IUser | any = req.user;
  const fav = {
    code: req.body.code,
    name: req.body.name,
    price: req.body.price,
    img: req.body.img,
    color: req.body.color,
  };
  const created = await User.findOne({
    id: userBase._id,
  });
  if (created === null) {
    return res.json({ message: "You need to login first" });
  } else {
    const actual: any = await Favs.findOne({ userId: created._id });
    if (actual) {
      if (actual.favoritos.length !== 0) {
        const find = actual.favoritos.find((x: any) => {
          return x.code === req.body.code;
        });
        if (find) {
          if (find.code === req.body.code) {
            return res.json({ message: "favorite is already added" });
          }
        }
      }
    }
    const isUpdated = await Favs.updateOne(
      { userId: created._id },
      { $push: { favoritos: fav } },
      { upsert: true }
    );
    res.json({ isUpdated, message: "favorite added" });
  }
}
export async function deleteFav(req: Request, res: Response) {
  const userBase: any = req.user;
  const created: IUser | any = await User.findOne({ email: userBase.email });
  const favs: Fav | any = await Favs.findOne({ userId: created._id });
  const edit = favs.favoritos.filter((x: Fav) => {
    return x.code !== req.body.code;
  });
  console.log(edit);
  const isUpdated = await Favs.updateOne(
    { userId: created._id },
    { favoritos: edit }
  );
  res.json({ isUpdated, message: "se ha eliminado el favorito" });
}

export async function getFav(req: Request, res: Response) {
  const userBase: any = req.user;
  const created: Fav | any = await Favs.findOne({ userId: userBase.id });
  const answer = created.favoritos;
  res.json({ answer, message: "lista de favoritos" });
}
