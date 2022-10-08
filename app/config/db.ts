import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./.env" });

const url: string =
  process.env.MONGO_URI !== undefined ? process.env.MONGO_URI : "";

const connectDB = async () => {
  await mongoose.connect(url);
  console.log("MongoDb Connected");
};

module.exports = connectDB;
