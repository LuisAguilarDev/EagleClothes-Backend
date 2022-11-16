import dotenv from "dotenv";
import { model, Schema } from "mongoose";

dotenv.config({ path: "./.env" });

const addressSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  address: [],
});

const Address = model("Address", addressSchema);

interface Iaddress {
  userId: string;
  address: IUaddress[];
}

type IUaddress = {
  ZIP_CODE: string;
  Address: string;
  City: string;
  Country: string;
  Telephone_number: string;
};

export { Address, Iaddress, IUaddress };
