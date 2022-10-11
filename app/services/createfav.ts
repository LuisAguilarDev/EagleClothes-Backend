import { fav, Favs } from "../models/favs";
import { User } from "../models/user";

export async function createFav(fav: fav, user: any) {
  const created = await User.findOne({ email: user });
  //   console.log(created);
  const favs = new Favs({ ...fav });
  const isUpdated = await User.updateOne(
    { _id: created!._id! },
    { $push: { favs: favs } }
  );
  const result = await Favs.findOne({ name: fav.name });
  if (result === null) {
    const answer = await favs.save();
    return answer;
  }
  return result;
}
export async function deleteFav(fav: fav, user: any) {
  const created = await User.findOne({ email: user });
  const favs = await Favs.findOne({ name: fav.name });
  const isUpdated = await User.updateOne(
    { _id: created!._id! },
    { $pull: { favs: favs!._id } }
  );
  console.log(isUpdated);
  return { message: "se ha eliminado el favorito" };
}

export async function getFav(fav: fav, user: string) {
  const created = await User.findOne({ email: user });
  //   if (created?.favs?.length === 0) return { message: "user has no favorites" };
  if (created?.favs?.length === 1) {
    const favs = await Favs.find({ _id: created.favs?.[0] });
    return favs;
  }
  const objQuery = created?.favs?.map((f) => {
    return { _id: f };
  });
  const favs = await Favs.find({ $or: objQuery });
  return favs;
}
