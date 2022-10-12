import { Fav, Favs } from "../models/favs";
import { User } from "../models/user";

export async function createFav(fav: Fav, user: any) {
  console.log(fav);
  const created = await User.findOne({ email: user });
  console.log(created);
  // const favs = new Favs({ ...fav });

  const isUpdated = await Favs.updateOne(
    { userId: created!._id! },
    { $push: { favoritos: fav } },
    { upsert: true }
  );
  // const result = await Favs.findOne({ name: fav.name });
  // if (result === null) {
  //   const answer = await favs.save();
  //   return answer;
  // // }
  const user2 = await Favs.findOne({ userId: created!._id }).populate("userId");
  return user2;
}
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
