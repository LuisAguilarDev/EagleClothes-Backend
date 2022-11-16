import { Request, Response } from "express";

import { Address, Iaddress, IUaddress } from "../models/address";
import { IUser } from "../models/user";

export async function postAddress(req: Request, res: Response) {
  const userBase: IUser | any = req.user;
  console.log(req.body);
  const newAddress: IUaddress = {
    ZIP_CODE: req.body.ZIP_CODE,
    Address: req.body.Address,
    City: req.body.City,
    Country: req.body.Country,
    Telephone_number: req.body.Telephone_number,
  };
  console.log(newAddress);
  const actual: any = await Address.findOne({ userId: userBase.id });
  if (!actual) {
    const isUpdated = await Address.updateOne(
      { userId: userBase.id },
      { address: [newAddress] },
      { upsert: true }
    );
    return res.json({
      answer: isUpdated,
      message: "User has no address registered",
    });
  }
  if (actual) {
    if (actual.favoritos.length !== 0) {
      const find = actual.favoritos.find((a: IUaddress) => {
        return a.Address === newAddress.Address;
      });
      if (find) {
        return res.json({ message: "Address is already added" });
      }
    }
  }
  const isUpdated = await Address.updateOne(
    { userId: userBase.id },
    { $push: { address: newAddress } },
    { upsert: true }
  );
  res.json({ isUpdated, message: "Address added" });
}

export async function deleteAddress(req: Request, res: Response) {
  const userBase: any = req.user;
  const newAddress: IUaddress = {
    ZIP_CODE: req.body.ZIP_CODE,
    Address: req.body.Address,
    City: req.body.City,
    Country: req.body.Country,
    Telephone_number: req.body.Telephone_number,
  };
  const actual: Iaddress | null = await Address.findOne({
    userId: userBase.id,
  });
  if (actual) {
    const edit = actual.address.filter((a) => {
      return a.Address !== newAddress.Address;
    });
    const isUpdated = await Address.updateOne(
      { userId: userBase.id },
      { favoritos: edit }
    );
    res.json({ isUpdated, message: "Address has been removed" });
  }
}

export async function getAddress(req: Request, res: Response) {
  const userBase: any = req.user;
  const created: Iaddress | null = await Address.findOne({
    userId: userBase.id,
  });
  if (!created) {
    return res.send({ answer: [], message: "User has no Addresss" });
  }
  const answer = created.address;
  if (answer.length === 0) {
    return res.send({ answer: [], message: "User has no Addresss" });
  }
  res.json({ answer, message: "Favs list" });
}
